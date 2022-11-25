import React from 'react';
import { createClient } from '@supabase/supabase-js';
import { StyledRegisterVideo } from './styles';

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: ({ target }) => {
      setValues({ ...values, [target.name]: target.value });
    },
    clearForm() {
      setValues({});
    },
  };
}

const PROJECT_URL = 'https://uwrvcnnbdstgzaoiggmm.supabase.co';
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3cnZjbm5iZHN0Z3phb2lnZ21tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg4MTk5MzcsImV4cCI6MTk4NDM5NTkzN30.CgLW9-Zf0gGyGxXpv0S7N_-T4rGdKuHD_1fbOWblbjk';
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const { values, handleChange, clearForm } = useForm({
    initialValues: {
      titulo: 'Frost punk',
      url: 'https://www.youtube.com/watch?v=QsqatJxAUtk',
    },
  });
  const [modal, setModal] = React.useState(false);
  /* 
    ## O que precisamos para o form funcionar?
    - pegar os dados que vem do state
     - título
     - url do vídeo
    - precisamos ter um onSubmit do nosso form
    - Limpar o formulário após o Submit
  */

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setModal(true)}>
        +
      </button>
      {modal && (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            supabase
              .from('video')
              .insert({
                title: values.titulo,
                url: values.url,
                thumb: getThumbnail(values.url),
                playlist: 'jogos',
              })
              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

            setModal(false);
            clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setModal(false)}
            >
              X
            </button>
            <input
              placeholder="Titulo do vídeo"
              name="titulo"
              value={values.titulo}
              onChange={handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={values.url}
              onChange={handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}

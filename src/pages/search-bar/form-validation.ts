import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().when("name", (name, schema) => {
      if (name[0]) {
        return Yup.string()
            .required("Este campo es requerido")
            .min(4, "Debe tener al menos 4 caracteres")
            .matches(/^(?!.*doublevpartners).*$/i, "El nombre no puede contener doublevpartners");
      }
      return schema;
    }),
  }, [
    ['name', 'name'],
  ]);

export default validationSchema;
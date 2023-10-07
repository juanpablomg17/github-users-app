import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    name: Yup.string().when("name", (name, schema) => {
      if (name[0]) {
        return Yup.string()
            .required("Este campo es requerido")
            .matches(/^(?!.*doublevpartners).*$/i, "El nombre no puede contener doublevpartners");
      }
      return schema;
    }),
  }, [
    ['name', 'name'],
  ]);

export default validationSchema;
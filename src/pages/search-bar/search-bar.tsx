import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import validationSchema from "./form-validation";
import { UserColumnsTable, UsersFilters } from "../../interfaces/user/user";
import { TableColumn, TableFactory } from "../../components/table/table-factory";
import ModalResponse from "../../components/modals/modal-response";
import { ResponseCodes } from "../../utils/modal-response-code.enum";
import useGithubUsers from "../../hooks/use-search-user";
import { Spinner } from "../../components/spinner/spinner";
import { useAppDispatch } from "../../store/store";
import { fetchUsers } from "../../actions/user";
import ErrorMessage from "../../components/error/error-message";



const columns: TableColumn<UserColumnsTable>[] = [
  {
    header: 'ID',
    field: 'id',
  },
  {
    header: 'Login',
    field: 'login',
  },
  {
    header: 'URL',
    field: 'url',
  }
];

type UserFilter = {
  name?: string
}




export const SearchBar = () => {
  const [filter, setFilters] = useState<UsersFilters>({} as UsersFilters);
  const [showSpinner, setShowSpinner] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isError } = useGithubUsers(filter);

  useEffect(() => {
    if (showSpinner) {
      const timeout = setTimeout(() => {
        setShowSpinner(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [showSpinner]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFilter>({
    resolver: yupResolver(validationSchema),
  });

  const IS_SUCCESS_CONSULTED = !isLoading && data && data.items
  if (IS_SUCCESS_CONSULTED) {
    dispatch(fetchUsers(data))
  }

  const onSubmit = (filter: UserFilter) => {
    if (Object.values(filter || {}).every((filterValue) => !filterValue)) {
      ModalResponse({
        title: "Consulta de usuarios",
        text: "Debes ingresar al menos un parámetro",
        res: ResponseCodes.WARNING,
      });
      return;
    }

    const filterData: UsersFilters = {
      name: filter.name
    }

    setShowSpinner(true); 
    setFilters(filterData);
  };

  const handleViewProfile = (user: UserColumnsTable) => {
    navigate(`/user/${user.login}`);
  }

  const buttonActions = (user: UserColumnsTable): JSX.Element[] => {
    return [
      <button
        onClick={handleViewProfile.bind(this, user)}
        key="edit"
        className="px-2 py-1 mt-3 bg-blue-500 text-white rounded"
      >
        Ver Perfil
      </button>,
    ];
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="table_factoryContainer flex justify-center flex-col items-center mt-5">
        <div className="max-w-2xl mx-auto text-center mb-3">
          <p className="text-lg font-semibold">Bienvenido a Github users app</p>
          <p className="text-sm text-gray-500">Encuentra cualquier usuario asociado a una cuenta de GitHub</p>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="search-bar-filter"
          >
            <div className="input-container-filter">
              <input
                placeholder="Nombre"
                type="text"
                {...register("name")}
                name="name"
                autoComplete="off"
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            {errors.name && (
              <label className="text-red-500">{errors.name.message}</label>
            )}
            <div className="search-button mt-4 flex flex-col items-center">
              <button
                className="search-button button px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={false} type="submit"
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                <span>Buscar</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSpinner &&
      <div className="flex justify-center my-5"><Spinner /></div>
       }

      {data && data?.items?.length > 0 && !showSpinner && (
        <div className="max-w-auto mx-auto mt-5">
          <h1 className="text-center">Lista de usuarios</h1>
          <div className="text-center">
            <TableFactory
              data={data.items}
              columns={columns}
              buttonActions={buttonActions}
            />
          </div>
        </div>
      )}

    {!showSpinner && !isLoading && data && data?.items?.length === 0 && (
      <p className="text-2xl text-red-500 text-center mt-5">Ops! usuario no encontrado</p>
    )}

      {isError && (
        <ErrorMessage message="Ha ocurrido un error al realizar la consulta"/>
      )}
    </div>
  );
};
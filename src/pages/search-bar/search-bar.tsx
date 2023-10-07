import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import validationSchema from "./form-validation";
import { UserColumnsTable } from "../../interfaces/user/user";
import { TableColumn, TableFactory } from "../../components/table-factory";

const users: UserColumnsTable[] = [
  {
    id: 1,
    login: 'user1',
    url: 'https://github.com/user1',
    repository: 'repo1',
  },
  {
    id: 2,
    login: 'user2',
    url: 'https://github.com/user2',
    repository: 'repo2',
  },
  {
    id: 3,
    login: 'user3',
    url: 'https://github.com/user3',
    repository: 'repo3',
  },
];


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
  },
  {
    header: 'Repository',
    field: 'repository',
  },
];


type UserFilter = {
  name?: string;
};

export const SearchBar = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFilter>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (filter: UserFilter) => {
    
  };

  const buttonActions = (user: UserColumnsTable): JSX.Element[] => {
    return [
      <button onClick={() => {console.log(user)}} key="edit" className="px-2 py-1 bg-blue-500 text-white rounded">
        ver detalles
      </button>,
    ];
  };
  

  return (
<div className="bg-gray-100 p-4 rounded-lg">
  <form onSubmit={handleSubmit(onSubmit)} className="search-bar-filter">
    <div className="input-container-filter">
      <input
        placeholder="Nombre"
        type="text"
        {...register("name")}
        name="name"
        autoComplete="off"
        className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {errors.name && (
        <label className="error-label">{errors.name.message}</label>
      )}
    </div>
    <div className="search-button mt-4">
      <button
        className="search-button button px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        disabled={false}
      >
        <FontAwesomeIcon icon={faSearch} className="mr-2" />
        <span>Buscar</span>
      </button>
    </div>
  </form>

  <div>
      <h1>User Table</h1>
      <TableFactory data={users} columns={columns} buttonActions={buttonActions}/>
    </div>



</div>

);
};

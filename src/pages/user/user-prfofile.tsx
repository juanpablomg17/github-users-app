import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { UserProfileDto } from '../../interfaces/user/user'

import useGithubUserProfiles from "../../hooks/use-search-user-profiles";
import { Spinner } from "../../components/spinner/spinner";
import ErrorMessage from "../../components/error/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";


const initialUserProfile: UserProfileDto = {
  login: '',
  id: 0,
  node_id: '',
  avatar_url: '',
  gravatar_id: '',
  url: '',
  html_url: '',
  followers_url: '',
  following_url: '',
  gists_url: '',
  starred_url: '',
  subscriptions_url: '',
  organizations_url: '',
  repos_url: '',
  events_url: '',
  received_events_url: '',
  type: '',
  site_admin: false,
  name: null,
  company: null,
  blog: '',
  location: null,
  email: null,
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 0,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '',
  updated_at: '',
};


export const UserProfile = () => {
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileDto>(initialUserProfile);
  const { userLogin } = useParams();
  const [showSpinner, setShowSpinner] = useState(true);

  const { data, isLoading, isError } = useGithubUserProfiles({ userName: userLogin || '' });

  const IS_SUCCESS_CONSULTED = !isLoading && data && data.id;
  const IS_ERROR_CONSULTED = !isLoading && isError;

  useEffect(() => {
    if (!IS_SUCCESS_CONSULTED) {
      setShowUserProfile(false);
    } else {
      setUserProfile(data);
      setShowUserProfile(true);
    }
  }, [data, IS_SUCCESS_CONSULTED]);

  useEffect(() => {
    if (showSpinner) {
      const timeout = setTimeout(() => {
        setShowSpinner(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [showSpinner]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      {showSpinner && <div className="flex justify-center my-5"><Spinner /></div>}
  
      {!showUserProfile && !showSpinner && (
        <div className="text-center">
          <p className="text-2xl font-semibold mb-4">Usuario no encontrado</p>
          <p className="text-gray-500">Por favor, regrese al inicio.</p>
          <a href="/" className="text-blue-500 hover:underline">Ir al inicio</a>
        </div>
      )}
  
      {showUserProfile && (
        <div className="userProfile_container">
          <div className="table_factoryContainer flex justify-center flex-col items-center mt-5">
            <div className="max-w-2xl mx-auto text-center mb-3">
              <p className="text-lg font-semibold">{userProfile.login}</p>
            </div>
            <div className="flex justify-center">
              <div className="profile-avatar">
                <img
                  src={userProfile.avatar_url}
                  alt={`Avatar de ${userProfile.login}`}
                  className="rounded-full w-36 h-36"
                />
              </div>
            </div>
          </div>
  
          <div className="max-w-auto mx-auto mt-5">
            <h1 className="text-center text-blue-600">Detalles del usuario</h1>
            <div className="flex  justify-center">
            <ul className="list-disc text-black-300 pl-8">
                <li>ID: {userProfile.id}</li>
                <li>Node ID: {userProfile.node_id}</li>
                <li>
                  API de followers:{" "}
                  <a href={userProfile.followers_url} className="hover:underline">
                    {userProfile.followers_url}{" "}
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </li>
                <li>
                  API de following:{" "}
                  <a href={userProfile.following_url} className="hover:underline">
                    {userProfile.following_url}{" "}
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </li>
                <li>
                  API de gists:{" "}
                  <a href={userProfile.gists_url} className="hover:underline">
                    {userProfile.gists_url}{" "}
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </li>
                <li>
                  API de Organizaciones de GitHub:{" "}
                  <a href={userProfile.organizations_url} className="hover:underline">
                    {userProfile.organizations_url}{" "}
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </li>
                <li>
                  Perfil en GitHub:{" "}
                  <a href={userProfile.html_url} className="hover:underline">
                    {userProfile.html_url}{" "}
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="mt-5 flex justify-center">
            <a href="/" className="text-blue-500 hover:underline">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Volver al Inicio
              </button>
            </a>
          </div>
        </div>
      )}
  
      {IS_ERROR_CONSULTED && (
        <ErrorMessage message={"Ha ocurrido un error al consultar el perfil del usuario"} />
      )}
    </div>
  );
  
};

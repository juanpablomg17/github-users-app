import Swal, {SweetAlertIcon} from 'sweetalert2';

import { ResponseCodes } from '../../utils/modal-response-code.enum';


export type ModalResponseProps = {
    title: string;
    text: string;
    res: ResponseCodes;
};


const ModalResponse = ({ title, text, res }: ModalResponseProps) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'button green',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  let response: SweetAlertIcon = 'info';
  switch (res) {
    case ResponseCodes.SUCCESS:
      response = 'success';
      break;
    case ResponseCodes.WARNING:
      response = 'warning'
      break;
    case ResponseCodes.INFO:
      response = 'info'
      break;
    case ResponseCodes.ERROR:
      response = 'error'
      break;
    default:
      response = 'error';
      break;
  }

  swalWithBootstrapButtons.fire(title, text, response);
  return <div></div>;
};

export default ModalResponse;

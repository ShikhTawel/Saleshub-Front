import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { BASE_URL } from '../env';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function fromByteArrayToExcel(data, fileName) {
    const byteArray = new Uint8Array(
        atob(data.data)
            .split('')
            .map((char) => char.charCodeAt(0))
    );
    const workbook = XLSX.read(byteArray, {type: 'array'});
    const excelFile = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
    });
    return new File([new Blob([excelFile], {
        type: 'application/octet-stream'
    })], fileName + '.xlsx');
    
}

export function saveFile(file) {
    FileSaver.saveAs(file, file.name);
}

export function importExcel(url, SetIsLoading, fileName){
    SetIsLoading(true)

    axios
      .get(`${BASE_URL}` + url, {
        headers: {
          Authorization: localStorage.getItem(`access_token`),
        },
      })
      .then((result) => {
        SetIsLoading(false)
        FileSaver.saveAs(fromByteArrayToExcel(result, fileName))
      })
      .catch((err) => {
        SetIsLoading(false)

        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
}

export function exportExcel (url, SetIsLoading, file) {
    SetIsLoading(true)
    const multipartFile = new FormData()

    multipartFile.append('multipartFile', file)

    let headers = {
      Authorization: localStorage.getItem(`access_token`),
    }

    fetch(BASE_URL + url, {
      method: 'POST',
      body: multipartFile,
      headers: headers,
    })
      .then((response) => response.json())
      .then((result) => {
        SetIsLoading(false)
        toast.info(result.message)
      })
      .catch((err) => {
        SetIsLoading(false)

        if (err.response.data.errors) {
          let errors = err.response.data.errors

          for (let index = 0; index < errors.length; index++) {
            const error = errors[index]
            toast.error(error.message)
          }
        } else toast.error('Error Occurred')
      })
}
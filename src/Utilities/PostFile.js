import { BASE_URL } from "../env";

export async function postFileRequest(file, metaData) {
    const formData = new FormData();
    formData.append(file.name, file.data);
    formData.append(metaData.name, new Blob([JSON.stringify(metaData.data)], { type: 'application/json' }))
    return await fetch(BASE_URL + '/sdf', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    });
}

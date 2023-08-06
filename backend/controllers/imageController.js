

const url = 'http://localhost:8000'

export const uploadImage = (request, response) => {

    if (!request.file) {
        return response.status(404).json({ message: "file not found" })
    }


    const imgUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json({imgUrl})


}


export const getaccessToken = () => {
return sessionStorage.getItem("accessToken");

}


export const gettype = (value , body)=>{
    if(value.params){

        return { params : body}

    }else if (value.query){

        if(typeof body === 'object'){ //typeof datatype return krta hai 

            return {query : body._id}

        }
        else{
            return {query : body}
        }

    }
    return []
}
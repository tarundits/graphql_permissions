export const extractBearerToken = (req) => {
    try{
    	const token= req.headers.authorization;
    	return token;
    }
    catch(eror) {
        console.log(error.message);
    }
};
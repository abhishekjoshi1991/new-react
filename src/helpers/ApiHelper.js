
export default class ApiHelper {
    static apiCall(url,method,header)
    {
        const response =  fetch(url,{
            method: method,
            //mode: 'no-cors',
            headers:header
        }).then((result)=>response.json())
        //const result =await response.json();
       // return result
    }
  }

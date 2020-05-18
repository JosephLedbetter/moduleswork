 /**
 * eayhttp library
 * library for making http request
 * 
 * @version 2.0.0
 * @author Joe Ledbetter
 * @license MIT
 */

class EasyHTTP{
    // http GET request
    
    async get(url){
            const response = await fetch(url);
            const resData = await response.json()
            return resData;
        }
    
    // make http POST request
    async post(url, data){
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type" : "application/json"},
            body: JSON.stringify(data)
        });
          const resData = await response.json;
          return resData;
    }
    
    // make an HTTP PUT Request
    put(url, data){
        return new Promise((resolve, reject) => {
            fetch(url, 
                // posting has to take in physical data to be passed to the http.
                {
            // method = action
            method: 'PUT',
            // clarify type of data being psased
            headers: {
                'Content-type' : 'application/json'
            },
            // stringfy to render the JSON object and passed
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(err => reject(err));
            });
        }
    
    // make http DELETE request
    delete(url){
        return new Promise((resolve, reject) => {
            fetch(url, 
                // posting has to take in physical data to be passed to the http.
                {
            // method = action
            method: 'DELETE',
            // clarify type of data being psased
            headers: {
                'Content-type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => resolve('Resource deleted'))
            .catch(err => reject(err));
            });
        }
    
    }

export const http = new EasyHTTP();
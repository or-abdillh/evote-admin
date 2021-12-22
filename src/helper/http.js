import axios from 'axios'

const baseURL = 'https://dry-falls-66840.herokuapp.com'

const headers = () => {
   return {
      'content-type': 'application/json',
		'token': localStorage.getItem('$evote-token') || null
   }
}

export default {
    //METHOD GET
	get( extend = '', callback ) {
		axios.get(`${baseURL}/${extend}`, { headers: headers() })
			.then(res => {
				const response = res.data
				//Success response
				if (response.code === 200) callback(response, true)
			})	
			.catch(err => {
				if (err.response) {
				  callback(err.response.data, false)
			    }
			})
	},
	//METHOD POST
	post( extend = '', body, callback ) {
		//Creaate Headers
		const headers = {
			'content-type': 'application/json',
			'token': localStorage.getItem('$evote-token') || null
		}
		axios.post(`${baseURL}/${extend}`, body, { headers: headers() })
		  .then(res => {
		  	if (res.data.code === 200) callback(res.data, true)
		  })
		  .catch(err => {
		  	if (err.response) {
			  callback(err.response.data, false)
		    }
		  })
	}
}

import { format } from 'date-fns';


// Utility functions used throughout app

export const checkValidity = (value, rules) => {
    // Checks the validity of a 
    if (!rules) {
        return true
    }

    let isValid = true;

    if (rules.required) {
        isValid = value !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;

}


export const checkoutInfoFormat = {
	name: {
		title: "Name",
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Full Name'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	email: {
		title: "Email",
		elementType: 'input',
		elementConfig: {
			type: 'email',
			placeholder: 'email@example.com'
		},
		value: '',
		validation: {
			required: true,
			isEmail: true
		},
		valid: false,
		touched: false
	},
	phone: {
		title: "Phone",
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Phone'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	address: {
		title: "Address",
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Address'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	}
}

export const loginInputsFormat = {
	username: {
		title: "Username",
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'username e.g jackson87'
		},
		value: '',
	},
    email: {
		title: "E-mail",
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Your E-mail address'
		},
		value: '',
	}
}

export const commentInputFormat = {
	comment: {
		elementType: 'textarea',
		elementConfig: {
			type: 'text',
			placeholder: 'Any suggestions, feedback, insights? Type them here'
		},
		value: '',
	}
}

export const formatPrice = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDate = (date) => {
	return format(date, 'MMMM do yyyy, h:mm:ss a');
}

export const parseGarnish = (garnishList) => {
	return garnishList.join(', ')
}


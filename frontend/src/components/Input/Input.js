import styles from './Input.module.css';

const input = ({elementType, elementConfig, title, value, changed, invalid, touched}) => {
    let inputElement = null;
    const inputstyles = [styles.Input];

    if(invalid && touched){
        inputstyles.push(styles.Invalid);
    }

    switch( elementType ) {
        case( 'input' ): 
            inputElement = <input 
                    className={inputstyles.join(' ')} {...elementConfig} 
                    value = {value}
                    onChange = {changed} />;
            break;
        case( 'textarea' ):
            inputElement = <textarea 
                    className={inputstyles.join(' ')} {...elementConfig} 
                    value = {value}
                    onChange = {changed} />;
            break;
        case( 'select' ):
            inputElement = <select
                    className={inputstyles.join(' ')} 
                    value = {value}
                    onChange = {changed} >
                    {elementConfig.options.map(option => (
                        <option key = {option.value} value = {option.value}>{option.displayValue}</option>
                    ))}
                    </select>
            break;
        default:
            inputElement = <input 
                    className={inputstyles.join(' ')} {...elementConfig} 
                    value = {value} />
    }

    return (
        <div className = {styles.InputWrapper}>
            <label><h4 className="section-subtitle">{title}</h4></label>
            {inputElement}
        </div>
    )
}

export default input;
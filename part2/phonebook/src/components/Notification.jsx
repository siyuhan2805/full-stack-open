
const Notification = ({message}) => {
    // first initialisation would mean no messages hence nothing should be rendered
    if (Object.keys(message).length === 0) {
        return null
    }
    else if (message.isError === false) {
        // only render upon non-error action
        return (
            <div className="notification">
                {message.message}
            </div>
        )
    }
    else {
        // render on error actions 
        return (
            <div className="error">
                {message.message}
            </div>
        )
    }
    
    
}

export default Notification
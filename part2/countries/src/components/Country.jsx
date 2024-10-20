const Country = ({countryName, showCountryInfo}) => {
    return (
        <div key={countryName}>
        {countryName}<button type="button" value={countryName}onClick={showCountryInfo}>show</button>
        </div>
    )  
}

export default Country
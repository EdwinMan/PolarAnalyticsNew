import React, {useState, useEffect} from 'react'
import { Grid } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import axios from 'axios';

export default function SideBar(props) {

  const currentPlanetHandler = props.currentPlanetHandler;
  const currentPlanet = props.currentPlanet;
  
    const [coins, setCoins] = useState(20);
    const [planets, setPlanets] = useState([]);
    const [planetDistination, setPlanetDistination] = useState("");
    const [path, setPath] = useState("");

    useEffect(()=>{

      axios.get('http://localhost:5000/api')
      .then(function ({data}) {
        setPlanets(data);
        currentPlanetHandler(data[0].name);
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      
    }, [])


    const selectPlanetHandler = (planet) => {
      if( planet === currentPlanet)
        alert("You are already on This Planet")
      else{

        axios.post('http://localhost:5000/api/path', {
          first:currentPlanet,
          second:planet
      })
        .then(function ({data}) {
          console.log(data);
          setPath(data)
          setPlanetDistination(planet)
        })
        .catch((error)=> {
          alert("Not Connected to the Server");
          console.log("Error: ", error)
        })
      }
    }

    const travelHandler = (cost) => {
      currentPlanetHandler(planetDistination)
      setPath("")
      setCoins(coins - cost)
    }

    const container = {
      background:'#FFD07F',
      border:"3px solid #FDA65D",
      height:'90%',
      borderRadius:'20px',
      margin:'40px 0 0 20px',
      paddingTop:'40px',
      opacity:"93%"
      }

      const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          console.log("Data FROM the Uploaded File", JSON.parse(e.target.result))
          axios.post('http://localhost:5000/api/upload', {
            spaceData: JSON.parse(e.target.result)
        })
          .then(function () {
            setPlanets(JSON.parse(e.target.result));
            setCoins(20)
            alert("data Updated")
          })
          .catch((error)=> {
            console.log(error)
          })
        };
      };


    return (
<div style={container}>
    <Grid style={{textAlign: "center", justifyContent:'center'}} container columns={12}>

    <Grid style={{marginBottom:'20px', marginLeft:"20px"}} item xs={12}>
            <label>Upload Your Own Json File </label><input onChange={handleChange} type="file" />
            <br/>
        </Grid>

        <Grid style={{marginBottom:'50px', fontSize:"30px"}} item xs={12}>
            {coins} Camemberts
        </Grid>

        {planets.map((element, index) => 
        <div key={index}>
            <Grid onClick={()=> selectPlanetHandler(element.name)} className="hover" item xs={12}>
            {element.name}{element.name === currentPlanet ? <PublicIcon color="success" fontSize="large"/> : <PublicIcon color="info" fontSize="large"/>}
            </Grid>
            <br />
            <br />
            <br />
        </div>
        )} 

        <br />
        <br />          
        <br />
        <br />
        {path === "" ? 
        <Grid style={{marginBottom:'50px', fontSize:"25px"}} item xs={12}>
          There is No Planet Selected
        </Grid>
        :
        path.path === null ? 
        <Grid style={{marginBottom:'50px', fontSize:"25px", color:"#852747"}} item xs={12}>
          This Planet is not Reachable from Here
        </Grid>
        :
        null
        }


        {path.path instanceof Array ?             
        <Grid style={{marginBottom:'50px', fontSize:"25px"}} item xs={12}>
            {path.path.map((element, index) => 
            <div key={index}>
              <div>{element}<PublicIcon color="info" fontSize="small"/></div>
              {path.path.at(-1) !== element ? <span>&#8595;</span> : null}
            </div>
             )}
            <br/>
             Total Camemberts Needed: {path.cost}
            <br/>

            {coins < path.cost ? 
            <button disabled>Not Enough Camemberts</button>
            :
            <button onClick={()=> travelHandler(path.cost)}>GO :)</button>
            }
              
        </Grid>
        : 
        null}

    </Grid>
      </div>

    )
}

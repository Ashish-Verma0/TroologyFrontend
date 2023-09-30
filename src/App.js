import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
function App() {
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [blockId, setBlockId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [blockName, setBlockName] = useState("");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    // Fetch the list of States when the component mounts
    axios
      .get("/api/states")
      .then((response) => {
        if(response.data.message){
          setStates(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching States:", error);
      });
  }, []);
  const handleStateChange = (e) => {
    setStateId(e.target.value);
    // Fetch the list of Districts based on the selected State
    axios
      .get(`/api/districts?state=${e.target.value}`)
      .then((response) => {
        if(response.data.message){
          
          setDistricts(response.data.message);
          console.log("ashishhh",districts)
        }
      })
      .catch((error) => {
        console.error("Error fetching Districts:", error);
      });
    };

  const handleDistrictChange = (e) => {
    setDistrictId(e.target.value);
    axios
      .get(`/api/blocks?district=${e.target.value}`)
      .then((response) => {
        if(response.data.message){  
          setBlocks(response.data.message);
          console.log("ashishhh",blocks)
        }
      })
      .catch((error) => {
        console.error("Error fetching Blocks:", error);
      });
  };
  const handleStateCreate = async () => {
    try {
      const response = await axios.post("/api/states", {
        state_name: stateName,
      });
      const newStateId = response.data.message._id;
      setStateId(newStateId);
      console.log("State created:", response.data);
    } catch (error) {
      console.error("Error creating State:", error);
    }
  };

  const handleDistrictCreate = async () => {
    try {
      const response = await axios.post("/api/districts", {
        district_name: districtName,
        state: stateId,
      });
      const newDistrictId = response.data.message._id;
      setDistrictId(newDistrictId);
      console.log("District created:", response.data);
      // Handle success or show a message to the user.
    } catch (error) {
      // Handle error and display an error message.
      console.error("Error creating District:", error);
    }
  };

  const handleBlockCreate = async () => {
    try {
      const response = await axios.post("/api/blocks", {
        block_name: blockName,
        state: stateId,
        district: districtId,
      });
      const newBlockId = response.data.message._id;
      setBlockId(newBlockId);
      console.log("Block created:", response.data);
      // Handle success or show a message to the user.
    } catch (error) {
      // Handle error and display an error message.
      console.error("Error creating Block:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/villages", {
        village_name: villageName,
        state: stateId,
        district: districtId,
        block: blockId,
      });
      console.log("Village created:", response.data);
      // Handle success or show a message to the user.
    } catch (error) {
      // Handle error and display an error message.
      console.error("Error creating Village:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add a Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select State:</label>
          <select value={stateId} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.state_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New State Name"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
          <button type="button" onClick={handleStateCreate}>
            Create State
          </button>
        </div>
        <div>
          <label>Select District:</label>
          <select value={districtId} onChange={handleDistrictChange}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district._id} value={district._id}>
                {district.district_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New District Name"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
          />
          <button type="button" onClick={handleDistrictCreate}>
            Create District
          </button>
        </div>
        <div>
          <label>Select Block:</label>
          <select value={blockId} onChange={(e) => setBlockId(e.target.value)}>
            <option value="">Select Block</option>
            {blocks.map((block) => (
              <option key={block._id} value={block._id}>
                {block.block_name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="New Block Name"
            value={blockName}
            onChange={(e) => setBlockName(e.target.value)}
          />
          <button type="button" onClick={handleBlockCreate}>
            Create Block
          </button>
        </div>
        <div>
          <label>Village Name:</label>
          <input
            type="text"
            placeholder="Village Name"
            value={villageName}
            onChange={(e) => setVillageName(e.target.value)}
          />
        </div>
        <button type="submit">Add Village</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
  },
};

export default App;
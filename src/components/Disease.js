// import React, { useEffect, useState } from 'react';

// const Disease = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:5600/diseases') 
//       .then(response => response.json())
//       .then(jsonData => setData(jsonData.diseases))
//       .catch(error => console.error('Error loading data:', error));
//   }, []);

//   return (
//     <div className='cards'>
//       {data.map((disease, index) => (
//         <div className="card" key={index}>
//           <img src={disease.image} alt={disease.name}  className="card-image" />
//           <h2>{disease.name}</h2>
//           <p><strong>Treatment:</strong> {disease.treatment}</p>
//           <p><strong>Prevention:</strong> {disease.prevention}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Disease;

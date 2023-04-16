import styled from "styled-components";

export const root = styled.div`
height: 85vh;
//   padding-top: 2rem;
margin-top: 15vh;
display: flex;
justify-content: center;
background: #e6e6e6;
`;
export const signInBox = styled.div`
//   margin-top: 5rem;
//   padding-top: 5rem;
//   padding-bottom: 5rem;
display: flex;
justify-content: center;
`;
export const box = styled.div`
  background-color: white;
  height: 70vh;
  // width: 60vh;
  border-radius: 5px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 2.5rem;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

export const part = styled.div`

justify-content: space-between;
// margin-left: 3rem;
// margin-right: 3rem;
margin-top: 1rem;
align-items: center;

p{
    margin-left:1rem;
},
.email{
    width:25rem;
    margin-left:1rem;
},


.signUpButton{

    width:25rem;
    margin-left:1rem;
    
},


`;
export const subBox = styled.div`
  margin-left: -1.5rem;
`;

export const flexDiv = styled.div`

display:flex;

.name{
    width:25rem;
},

.newPassword{
    
},
.confirmPassword{
    margin-left:1rem;
},
`;

import styled from "styled-components";

export const root = styled.div`
  height: 95vh;
  //   padding-top: 2rem;
  margin-top: 9vh;
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
  height: 60vh;

  //   width: 45vh;
  border-radius: 5px;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1.5rem;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;
export const subBox = styled.div`
  margin-left: 0.5rem;
`;

export const part = styled.div`

justify-content: space-between;
// margin-left: 3rem;
// margin-right: 3rem;
margin-top: 1rem;
align-items: center;

.email{
    color: red;
    width:20rem;
    // margin-left: 3rem;
},
.password{
    width:20rem;
    // margin-left: 1rem;
},
.signInButton{

    width:20rem;
    
},


`;

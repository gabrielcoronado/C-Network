import styled from "styled-components";

export const Wrapper = styled.div`
  justify-content: center;
  margin: 0 auto;
  padding: 40px 60px;
  max-width: 1300px;
  /* background: transparent; */
  width: 100%;
  /* border-bottom: 1px solid black; */
  background-position: right -200px top;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/uQtqiAu2bBlokqjlURVLEha6zoi.jpg); */
`;

export const Poster = styled.img`
  border-radius: 10px;
  height: 450px;
`;

export const MovieWrapper = styled.div`
  /* padding: 0 40px; */
  display: flex;
  /* background: transparent; */
  width: 100%;
  opacity: 1;
`;

export const H1 = styled.div`
  font-weight: 600;
  font-size: 35px;
`;

export const Tagline = styled.div`
  font-weight: 300;
  color: gray;
`;

export const Button = styled.button`
  /* background-color: #032541; */
  background-color: transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  color: white;
  height: 47px;
  border: none;
  margin: 15px;
  width: 47px;
`;

export const Lang = styled.div`
  margin: 0 5px;
`;

export const Details = styled.div`
  align-items: center;
  font-weight: 300;
  font-size: 15px;
  margin: 7px 0;
  display: flex;
`;

export const Overview = styled.div`
  font-weight: 300;
`;

export const MovieInfo = styled.div`
  align-self: center;
  padding-left: 40px;
`;

export const Genre = styled.div`
  padding-right: 5px;
  padding-left: 5px;
  display: flex;
`;

export const Runtime = styled.div`
  padding-left: 5px;
`;

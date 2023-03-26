import { createGlobalStyle } from 'styled-components';

const Fonts = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300&display=swap&subset=thai');

  * {
    font-family: 'Poppins', 'Prompt', sans-serif !important;
  }
`;

export default Fonts;
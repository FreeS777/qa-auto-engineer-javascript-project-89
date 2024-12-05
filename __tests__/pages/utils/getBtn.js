import { screen } from '@testing-library/react';

async function getBtn(selector) {
  return screen.getByRole('button', selector);
}

export default getBtn;

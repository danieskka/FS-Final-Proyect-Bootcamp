import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
import Card from "./Card";

describe('Card', () => {
  it('should have showMore set to false initially', () => {
    const character = {
      id: 1,
      name: "Harry Potter",
      description: "The boy who lived",
      image: "https://ik.imagekit.io/hpapi/harry.jpg",
    };

    const { container } = render(<Card character={character} />);

    // Verificar que el estado showMore está inicializado en false
    expect(container.querySelector('.additional-info')).toBe(null);
  });
});
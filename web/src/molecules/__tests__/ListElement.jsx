import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListElement from "../ListElement";

const onAddMock = jest.fn();
const onRemoveMock = jest.fn();

const product={
    id: '1',
    name: 'shoes',
    price: 99,
    quantity: 1,
  }
describe("<ListElement/>", () => {   
it("render elements", () => {
    render(<ListElement product={product}/>)
    const name=screen.getByText(product.name);
    expect(name).toBeDefined();

    const quantity=screen.getByText(product.quantity);
    expect(quantity).toBeDefined();

    const price = screen.getAllByText("0.99zł");
    expect(price).toBeDefined();
  });

  it("check +1 and -1 button", () => {
    const onAddMock = jest.fn();
    const onRemoveMock = jest.fn();
    render(
      <ListElement
        product={product}
        onAdd={onAddMock}
        onRemove={onRemoveMock}
      />
    );
    const addButton = screen.getByText("+1");
    const removeButton = screen.getByText("-1");

    user.click(addButton);
    user.click(removeButton);

    expect(onAddMock).toBeCalledTimes(1);
    expect(onRemoveMock).toBeCalledTimes(1);
  });
  it("check price for 3 and 0 elements", () => {
    const { rerender } = render(<ListElement product={product} />);

    const price = screen.getAllByText("0.99zł");
    expect(price).toBeDefined();
    
    product.quantity = 0;

    rerender(<ListElement product={product} />);

    const unitPrice = screen.getAllByText("0.99zł");
    expect(unitPrice).toHaveLength(0);
    const sumPrice = screen.getAllByText("0.00zł");
    expect(sumPrice).toHaveLength(0);

    product.quantity = 3;
    
    rerender(<ListElement product={product} />);

    const unitPrice2 = screen.getAllByText("0.99zł");
    expect(unitPrice2).toHaveLength(1);
    const sumPrice2 = screen.getAllByText("2.97zł");
    expect(sumPrice2).toHaveLength(1);
    
  });
});
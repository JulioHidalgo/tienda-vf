import { shallowMount } from "@vue/test-utils";
import Cart from "@/components/ShoppingCart.vue";

describe("ShoppingCart.vue", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    mockStore = {
      state: {
        cart: [
          {
            id: "1",
            name: "Producto 1",
            price: 1000,
            qty: 2,
          },
        ],
      },
      dispatch: jest.fn(),
    };

    wrapper = shallowMount(Cart, {
      global: {
        mocks: {
          $store: mockStore,
        },
      },
    });
  });

  it("muestra los productos del carrito", () => {
    expect(wrapper.text()).toContain("Producto 1");
    expect(wrapper.text()).toContain("1000");
    expect(wrapper.text()).toContain("2");
  });

  it("llama removeFromCart al eliminar", async () => {
    const buttons = wrapper.findAll("button");
    await buttons[2].trigger("click");

    expect(mockStore.dispatch).toHaveBeenCalledWith("eliminarDelCarrito", "1");
  });
});
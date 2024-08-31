import { FaTrash, FaPen } from "react-icons/fa";

export default function ReadDataCmp({ Products, handleDeleteItem, handleEditItem }) {
  return (
    <table>
      
        <thead>
          <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Price</td>
            <td>Taxes</td>
            <td>Ads</td>
            <td>Discount</td>
            <td>Total</td>
            <td>Category</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>
        </thead>
      
        <tbody>
          {Products.length ? (
            Products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.taxes || 0}</td>
                  <td>{product.ads || 0}</td>
                  <td>{product.discount || 0}</td>
                  <td>{product.total || 0}</td>
                  <td>{product.category}</td>
                  <td>
                    <FaPen id="Edit" onClick={() => handleEditItem(index)} />
                  </td>
                  <td>
                    <FaTrash id="delete" onClick={() => handleDeleteItem(index)} />
                  </td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="10" className="No_Product"><i>No Products</i></td></tr>
          )}
        </tbody>
      </table>
  );
}

import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, ShoppingBag, ListOrdered, Package, 
  Plus, Search, Filter, Edit3, Trash2, X, Image as ImageIcon,
  ChevronLeft, ChevronRight, Users, Menu, MoreVertical
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useContext } from 'react';
import { AppContext } from '../context.jsx/AppContext';
import { useRef } from 'react';
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Products = () => {
// --- STATE MANAGEMENT ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const {products, fetchProducts, backendUrl} = useContext(AppContext);

   const fileInputRef = useRef(null);
   const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({ 
    name: '', price: '', category: 'Electronics', stock: '', image: null , description: '' 
  });

  // --- LOGIC ---
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCategory === "All" || p.category === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [products, searchTerm, filterCategory]);

   const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "Electronics",
      description: "",
      image: null
    });
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
      image: null
    });
    setImagePreview(product.image);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // setProducts(products.filter(p => p.id !== id));
      try {
        await axios.delete(backendUrl+"/api/products/"+id);
        fetchProducts();
      } catch (error) {
        console.error(error);
      alert("Product delete failed");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) data.append("image", formData.image);
    let res = null;
    try {
      if (editingProduct) {
        res = await axios.put(`${backendUrl}/api/products/${editingProduct._id}`, data);
      } else {
        res = await axios.post(backendUrl+"/api/products", data);
      }
      // console.log(res.data);
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Product save failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex overflow-hidden">
      
      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 bg-gray-100 rounded-lg"><Menu size={20} /></button>
            <h1 className="text-xl font-black text-gray-900">Inventory Management</h1>
          </div>
          <div className='flex gap-3'>
          <button onClick={()=>navigate("/orders") } className="bg-green-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all">
            <span className="hidden sm:inline">Orders</span>
          </button>
          <button onClick={handleOpenAddModal} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-all">
            <Plus size={18} /> <span className="hidden sm:inline">Add Product</span>
          </button>
          </div>
        </header>

        <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* SEARCH & FILTER BAR */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by product name..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-600 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr className="text-gray-400 text-[10px] uppercase tracking-[0.15em]">
                    <th className="px-6 py-5 font-black">Product Info</th>
                    <th className="px-6 py-5 font-black">Category</th>
                    <th className="px-6 py-5 font-black">Price</th>
                    <th className="px-6 py-5 font-black">Stock</th>
                    <th className="px-6 py-5 font-black text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="group hover:bg-indigo-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={p.image} className="w-14 h-14 rounded-2xl object-cover border border-gray-100" alt="" />
                          <div>
                            <p className="font-bold text-gray-900 leading-tight mb-1">{p.name}</p>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${p.stock>0?'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{p.stock>0?"In Stock":"Unavailable"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-500">{p.category}</td>
                      <td className="px-6 py-4 font-black text-gray-900">${p.price}</td>
                      <td className="px-6 py-4 font-bold text-gray-600">{p.stock} Units</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleOpenEditModal(p)} className="p-2.5 text-gray-400 hover:text-indigo-600 bg-gray-50 hover:bg-indigo-100 rounded-xl transition-all"><Edit3 size={18}/></button>
                          <button onClick={() => handleDelete(p._id)} className="p-2.5 text-gray-400 hover:text-rose-600 bg-gray-50 hover:bg-rose-100 rounded-xl transition-all"><Trash2 size={18}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <div className="p-20 text-center text-gray-400 font-bold uppercase tracking-widest">No Products Found</div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 3. POPUP MODAL (Add/Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-gray-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl my-auto animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">{editingProduct ? 'Edit Product' : 'Create New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Col: Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Title</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} type="text" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price ($)</label>
                      <input required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} type="number" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Stock</label>
                      <input required min={0} value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} type="number" className="w-full mt-1 px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full mt-1 px-4 py-3 bg-gray-50 border border-transparent rounded-xl outline-none font-bold text-gray-600 focus:bg-white focus:ring-2 focus:ring-indigo-500">
                      <option>Electronics</option><option>Fashion</option><option>Home</option>
                    </select>
                  </div>
                </div>

                {/* Right Col: Image Preview */}
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Photo Preview</label>
                   <div
                    onClick={() => fileInputRef.current.click()}
                    className="aspect-[4/3] border-2 border-none bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer"
                  >
                    {imagePreview ? (
                      <img src={imagePreview} className="w-full h-full object-cover rounded-2xl" />
                    ) : (
                      <ImageIcon size={48} className="text-gray-300" />
                    )}
                  </div>
                  <input  ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    // className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      setFormData({ ...formData, image: file });
                      setImagePreview(URL.createObjectURL(file));
                    }} placeholder="Image URL (e.g. Unsplash)" className=" hidden w-full px-4 py-2 bg-gray-100 border border-transparent rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full mt-1 px-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all"></textarea>
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]">
                {editingProduct ? 'Update Product Details' : 'Publish Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
}
export default Products

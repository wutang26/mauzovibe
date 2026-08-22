// resources/js/Pages/Seller/Products/Create.jsx

import { Head, useForm, Link } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import {
  Home,
  Package,
  PlusCircle,
  ShoppingBag,
  MessageSquare,
  Wallet,
  Settings,
  Upload,
  X,
  Image as ImageIcon,
  Search,
  Bell,
  MapPin,
  Heart,
  CheckCircle2,
  Bold,
  Italic,
  Underline,
  List,
  Link as LinkIcon,
  RotateCcw,
  RotateCw,
  Save,
  Send,
} from 'lucide-react';

export default function CreateProduct() {
  const { data, setData, post, processing, errors, progress } = useForm({
    name: 'Samsung Galaxy A15 4G',
    category: '',
    condition: 'iliyotumika',
    price: '1200000',
    location: 'Tabora, Tanzania',
    description:
      'Samsung Galaxy A15 4G, hali bora sana. Simu inafanya kazi vizuri, betri inashika vizuri. Ina kamera nzuri na skrini kubwa.',
    condition_rating: 'excellent',
    year_mileage: '2021 au 45,000 km',
    battery_notes: '',
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  const handleImageUpload = useCallback(
    (files) => {
      if (!files) return;
      const newFiles = Array.from(files).slice(0, 8 - data.images.length);
      setData('images', [...data.images, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    },
    [data.images, setData]
  );

  const removeImage = (index) => {
    setData(
      'images',
      data.images.filter((_, i) => i !== index)
    );
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('seller.products.store'), {
      forceFormData: true,
    });
  };

  return (
    <>
      <Head title="Ongeza Bidhaa Mpya - MauzoVibe" />

      <div className="min-h-screen bg-gray-50 flex">
        {/* ===== SIDEBAR ===== */}
        <aside className="w-64 bg-emerald-900 text-white flex flex-col fixed h-full">
          {/* Logo */}
          <div className="p-5 flex items-center gap-3 border-b border-emerald-800">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">MauzoVibe</div>
              <div className="text-xs text-emerald-300">Ecommerce</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-3 space-y-1">
            <NavItem
              href={route('seller.dashboard')}
              icon={<Home size={20} />}
              label="Dashboard"
            />
            <NavItem
              href={route('seller.products.index')}
              icon={<Package size={20} />}
              label="Bidhaa Zangu"
            />
            <NavItem
              href={route('seller.products.create')}
              icon={<PlusCircle size={20} />}
              label="Ongeza Bidhaa"
              active
            />
            <NavItem
              href={route('seller.sales')}
              icon={<ShoppingBag size={20} />}
              label="Mauzo"
            />
            <NavItem
              href={route('seller.messages')}
              icon={<MessageSquare size={20} />}
              label="Ujumbe"
            />
            <NavItem
              href={route('seller.wallet')}
              icon={<Wallet size={20} />}
              label="Hesabu"
            />
            <NavItem
              href={route('seller.settings')}
              icon={<Settings size={20} />}
              label="Mipangilio"
            />
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-emerald-800">
            <div className="flex items-center gap-3 bg-emerald-800/50 rounded-xl p-3">
              <img
                src="https://i.pravatar.cc/100?u=juma"
                alt="Juma Ally"
                className="w-11 h-11 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate">Juma Ally</div>
                <div className="text-xs text-emerald-300">Muuzaji</div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Tanzania
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 ml-64">
          {/* Top Header */}
          <header className="bg-white border-b sticky top-0 z-20 px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Ongeza Bidhaa Mpya
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Ongeza bidhaa mpya na ufikie wateja wengi zaidi.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tafuta bidhaa au huduma..."
                  className="pl-10 pr-4 py-2.5 w-72 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <img
                src="https://i.pravatar.cc/100?u=juma"
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-100"
              />
            </div>
          </header>

          {/* Form + Preview */}
          <form onSubmit={submit} className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* LEFT: Form */}
              <div className="xl:col-span-2 space-y-6">
                {/* 1. Product Images */}
                <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    1. Picha za Bidhaa
                  </h2>
                  <p className="text-sm text-gray-500 mb-5">
                    Pakia hadi picha 8. Chagua picha zinazoonyesha bidhaa yako
                    vizuri.
                  </p>

                  <div className="grid grid-cols-4 gap-4">
                    {/* Upload Zone */}
                    <label className="col-span-1 aspect-square border-2 border-dashed border-emerald-300 rounded-xl bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-colors">
                      <Upload className="w-8 h-8 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-700">
                        Pakia Picha
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e.target.files)}
                      />
                    </label>

                    {/* Preview slots */}
                    {previews.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group"
                      >
                        <img
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    {/* Empty slots */}
                    {Array.from({
                      length: Math.max(0, 3 - previews.length),
                    }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="aspect-square border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50"
                      >
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Au chagua faili (Max 8 picha, JPG/PNG, max 5MB kila picha)
                  </p>
                </section>

                {/* 2. Product Details */}
                <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 mb-5">
                    2. Maelezo ya Bidhaa
                  </h2>

                  <div className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Jina la Bidhaa
                      </label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="mf. Samsung Galaxy A15 4G"
                        maxLength={100}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                      />
                      <div className="text-xs text-gray-400 text-right mt-1">
                        {data.name.length}/100
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Aina ya Bidhaa
                      </label>
                      <select
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none bg-white"
                      >
                        <option value="">Chagua aina</option>
                        <option value="simu">Simu</option>
                        <option value="laptop">Laptop</option>
                        <option value="electronics">
                          Vifaa vya Elektroniki
                        </option>
                        <option value="fashion">Fashion</option>
                      </select>
                    </div>

                    {/* Condition */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Hali ya Bidhaa
                      </label>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setData('condition', 'mpya')}
                          className={`flex-1 py-2.5 rounded-xl border font-medium transition ${
                            data.condition === 'mpya'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                          }`}
                        >
                          Mpya
                        </button>
                        <button
                          type="button"
                          onClick={() => setData('condition', 'iliyotumika')}
                          className={`flex-1 py-2.5 rounded-xl border font-medium transition flex items-center justify-center gap-2 ${
                            data.condition === 'iliyotumika'
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-emerald-400'
                          }`}
                        >
                          {data.condition === 'iliyotumika' && (
                            <CheckCircle2 size={16} />
                          )}
                          Iliyotumika
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Bei (TZS)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={data.price}
                          onChange={(e) =>
                            setData(
                              'price',
                              e.target.value.replace(/\D/g, '')
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none pr-16"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                          TZS
                        </span>
                      </div>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Mahali
                      </label>
                      <select
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none bg-white"
                      >
                        <option value="">Chagua mahali</option>
                        <option value="Tabora, Tanzania">
                          Tabora, Tanzania
                        </option>
                        <option value="Dar es Salaam, Tanzania">
                          Dar es Salaam, Tanzania
                        </option>
                        <option value="Mwanza, Tanzania">
                          Mwanza, Tanzania
                        </option>
                        <option value="Arusha, Tanzania">
                          Arusha, Tanzania
                        </option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Maelezo
                      </label>
                      <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-500">
                        {/* Toolbar */}
                        <div className="flex items-center gap-1 px-3 py-2 border-b bg-gray-50">
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <Bold size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <Italic size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <Underline size={16} />
                          </button>
                          <div className="w-px h-4 bg-gray-300 mx-1" />
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <List size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <LinkIcon size={16} />
                          </button>
                          <div className="flex-1" />
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <RotateCcw size={16} />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 hover:bg-gray-200 rounded"
                          >
                            <RotateCw size={16} />
                          </button>
                        </div>
                        <textarea
                          value={data.description}
                          onChange={(e) =>
                            setData('description', e.target.value)
                          }
                          rows={4}
                          maxLength={1000}
                          placeholder="Eleza bidhaa yako kwa undani..."
                          className="w-full px-4 py-3 outline-none resize-none text-sm"
                        />
                      </div>
                      <div className="text-xs text-gray-400 text-right mt-1">
                        {data.description.length}/1000
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Additional Details (Used products) */}
                {data.condition === 'iliyotumika' && (
                  <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">
                      3. Maelezo ya Ziada (Kwa Bidhaa Iliyotumika)
                    </h2>

                    <div className="space-y-5">
                      {/* Condition Rating */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hali ya matumizi
                        </label>
                        <div className="flex gap-4">
                          {['excellent', 'good', 'fair'].map((rating) => (
                            <label
                              key={rating}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="condition_rating"
                                value={rating}
                                checked={data.condition_rating === rating}
                                onChange={() =>
                                  setData('condition_rating', rating)
                                }
                                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                              />
                              <span className="text-sm capitalize">
                                {rating === 'excellent'
                                  ? 'Excellent'
                                  : rating === 'good'
                                  ? 'Good'
                                  : 'Fair'}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Year / Mileage */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Mwaka / Mileage (kama ni gari)
                        </label>
                        <input
                          type="text"
                          value={data.year_mileage}
                          onChange={(e) =>
                            setData('year_mileage', e.target.value)
                          }
                          placeholder="mf. 2021 au 45,000 km"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none"
                        />
                      </div>

                      {/* Battery notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Battery health / Condition notes
                        </label>
                        <textarea
                          value={data.battery_notes}
                          onChange={(e) =>
                            setData('battery_notes', e.target.value)
                          }
                          rows={2}
                          maxLength={300}
                          placeholder="Eleza hali ya betri na maelezo mengine muhimu..."
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none resize-none"
                        />
                        <div className="text-xs text-gray-400 text-right mt-1">
                          {data.battery_notes.length}/300
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </div>

              {/* RIGHT: Live Preview */}
              <div className="xl:col-span-1">
                <div className="sticky top-28">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="px-5 py-4 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-900">
                        Kagua Bidhaa (Live Preview)
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Hivi ndivyo bidhaa yako itakavyonekana kwenye
                        MauzoVibe.
                      </p>
                    </div>

                    {/* Product Card Preview */}
                    <div className="p-5">
                      <div className="relative rounded-xl overflow-hidden bg-gray-100 aspect-[4/3] mb-4">
                        {previews[0] ? (
                          <img
                            src={previews[0]}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          Mpya
                        </span>
                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow">
                          <Heart size={16} className="text-gray-600" />
                        </button>
                      </div>

                      <h4 className="font-bold text-lg text-gray-900 leading-tight">
                        {data.name || 'Jina la Bidhaa'}
                      </h4>
                      <div className="text-xl font-bold text-emerald-700 mt-1">
                        TZS {Number(data.price || 0).toLocaleString()}
                      </div>

                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
                        <MapPin size={14} />
                        {data.location || 'Mahali'}
                      </div>

                      <div className="flex items-center gap-2 mt-3 text-sm">
                        <span className="text-gray-600">Iliyotumika</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-emerald-600 font-medium">
                          Excellent
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-600">2021</span>
                      </div>

                      <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                        {data.description ||
                          'Maelezo ya bidhaa yataonekana hapa...'}
                      </p>

                      {/* Seller info */}
                      <div className="mt-5 pt-4 border-t flex items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/100?u=juma"
                          alt="Seller"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">Juma Ally</div>
                          <div className="text-xs text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Muuzaji Aliyethibitishwa
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="w-full mt-4 py-2.5 border border-emerald-600 text-emerald-700 rounded-xl font-medium hover:bg-emerald-50 transition flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={16} />
                        Wasiliana Muuzaji
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <p className="text-sm text-gray-500">
                Hakikisha maelezo yako ni sahihi kabla ya kuchapisha bidhaa.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <Save size={18} />
                  Hifadhi Rasimu
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center gap-2 disabled:opacity-60"
                >
                  <Send size={18} />
                  {processing ? 'Inachapishwa...' : 'Chapisha Bidhaa'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// Simple Nav Item component
function NavItem({ href, icon, label, active = false }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
        active
          ? 'bg-emerald-700 text-white'
          : 'text-emerald-100 hover:bg-emerald-800/60'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
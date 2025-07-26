import React from 'react';
import { useNavigate } from 'react-router-dom';
import arkaplanImage from '../assets/arkaplan.jpg';

const Home = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem('isLoggedIn');
  };

  const handleFeatureClick = (route: string) => {
    if (isAuthenticated()) {
      navigate(route);
    } else {
      alert('Bu özelliği kullanmak için giriş yapmanız gerekmektedir.');
      navigate('/login');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Full Screen Background - Image + Overlay */}
      <div className="absolute inset-0">
        <img 
          src={arkaplanImage} 
          alt="AGROVİA Sistemi Arkaplan"
          className="w-full h-full object-cover"
          style={{ minHeight: '100vh' }}
          onLoad={() => console.log('Arkaplan resmi başarıyla yüklendi')}
          onError={(e) => {
            console.log('Arkaplan resmi yüklenemedi:', e);
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Dark Overlay with Green Gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/60 to-emerald-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              AGROVİA 
              <span className="block text-emerald-400">SİSTEMİ</span>
            </h1>
            <p className="text-xl md:text-3xl mb-8 text-gray-200 font-light leading-relaxed">
              Profesyonel sera yönetimi ve 
              <span className="block">dikim öncesi kontrol sistemi</span>
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Sera üreticileri için geliştirilmiş kapsamlı takip ve kontrol sistemi. 
              Dikim öncesi dönem kontrollerinden hasat sürecine kadar tüm üretim aşamalarınızı dijital ortamda yönetin.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {!isAuthenticated() ? (
                <>
                  <button 
                    onClick={() => navigate('/login')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg border-2 border-emerald-500 hover:border-emerald-400"
                  >
                    Sisteme Giriş Yap
                  </button>
                  <button 
                    onClick={() => navigate('/about')}
                    className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black font-semibold py-4 px-12 rounded-full transition-all duration-300 text-lg"
                  >
                    Daha Fazla Bilgi
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/admin')}
                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg border-2 border-emerald-500 hover:border-emerald-400"
                  >
                    Admin Panel
                  </button>
                  <button 
                    onClick={() => handleFeatureClick('/dikim-oncesi')}
                    className="border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black font-semibold py-4 px-12 rounded-full transition-all duration-300 text-lg"
                  >
                    Hızlı Başlangıç
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-900 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Sistem <span className="text-emerald-400">Özellikleri</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Modern sera yönetimi için ihtiyacınız olan tüm araçlar tek platformda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Producer Management */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-emerald-500/50">
                <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 w-fit border border-emerald-500/30">
                  <span className="text-3xl">👥</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Üretici Yönetimi</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Üretici bilgilerini kaydedin, düzenleyin ve her üretici için ayrı takip yapın.
                </p>
                <div className="flex items-center text-sm text-emerald-400 font-semibold">
                  <span className="mr-2">🔐</span>
                  <span>Giriş Gerekli</span>
                </div>
              </div>

              {/* Pre-Planting Checklist */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-emerald-500/50">
                <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 w-fit border border-emerald-500/30">
                  <span className="text-3xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Dikim Öncesi Kontrol</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  11 kategoride detaylı kontrol listesi. Solarizasyon, toprak analizi, dezenfeksiyon ve daha fazlası.
                </p>
                <div className="flex items-center text-sm text-emerald-400 font-semibold">
                  <span className="mr-2">🔐</span>
                  <span>Giriş Gerekli</span>
                </div>
              </div>

              {/* Photo Documentation */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-emerald-500/50">
                <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 w-fit border border-emerald-500/30">
                  <span className="text-3xl">📸</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Fotoğraf Dokümantasyonu</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Cloudinary entegrasyonu ile fotoğraf yükleme ve kontrol süreçlerini görsel olarak belgeleme.
                </p>
                <div className="flex items-center text-sm text-emerald-400 font-semibold">
                  <span className="mr-2">🔐</span>
                  <span>Giriş Gerekli</span>
                </div>
              </div>

              {/* Data Management */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-emerald-500/50">
                <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 w-fit border border-emerald-500/30">
                  <span className="text-3xl">💾</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Veri Yönetimi</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Firebase entegrasyonu ile güvenli veri saklama ve gerçek zamanlı senkronizasyon.
                </p>
                <div className="flex items-center text-sm text-emerald-400 font-semibold">
                  <span className="mr-2">🔐</span>
                  <span>Giriş Gerekli</span>
                </div>
              </div>

              {/* Reports & Analytics */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-emerald-500/50">
                <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 w-fit border border-emerald-500/30">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Raporlama</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Detaylı raporlar, istatistikler ve kontrol süreçlerinin analizi.
                </p>
                <div className="flex items-center text-sm text-emerald-400 font-semibold">
                  <span className="mr-2">🔐</span>
                  <span>Giriş Gerekli</span>
                </div>
              </div>

              {/* Mobile Responsive */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-700 hover:border-emerald-500/50">
                <div className="bg-emerald-500/20 rounded-xl p-4 mb-6 w-fit border border-emerald-500/30">
                  <span className="text-3xl">📱</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Mobil Uyumlu</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Tablet ve telefon üzerinden saha çalışması yapmak için optimize edilmiş arayüz.
                </p>
                <div className="flex items-center text-sm text-emerald-400 font-semibold">
                  <span className="mr-2">🔐</span>
                  <span>Giriş Gerekli</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Section */}
        <div className="bg-black py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Modern <span className="text-emerald-400">Teknoloji</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              En güncel teknolojiler ile güvenli, hızlı ve kullanıcı dostu deneyim
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
                <div className="text-white font-semibold">React + TypeScript</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🔥</div>
                <div className="text-white font-semibold">Firebase Firestore</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">☁️</div>
                <div className="text-white font-semibold">Cloudinary</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎨</div>
                <div className="text-white font-semibold">Tailwind CSS</div>
              </div>
              <div className="text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📱</div>
                <div className="text-white font-semibold">Responsive</div>
              </div>
            </div>

            <div className="mt-12">
              <button 
                onClick={() => navigate('/about')}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-4 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg border-2 border-emerald-500 hover:border-emerald-400"
              >
                Detaylı Bilgi
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!isAuthenticated() && (
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
                Hemen Başlayın
              </h2>
              <p className="text-xl text-emerald-900 mb-8 leading-relaxed">
                Sera üretim süreçlerinizi dijitalleştirin ve verimliliğinizi artırın
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="bg-black text-emerald-400 font-bold py-4 px-12 rounded-full hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg border-2 border-black hover:border-gray-900"
              >
                Ücretsiz Başlayın
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

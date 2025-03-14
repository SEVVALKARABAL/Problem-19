import { useEffect, useState } from "react";

// Bu bileşen modal (dialog) bileşeni oluşturur ve isOpen state değişkeni true olduğunda modal açılır.
// Görevler:
// 1. Modal bileşenini yalnızca isOpen true olduğunda görünür hale getirin.
//    - Modal kapatıldığında, isOpen state'i false olarak güncellenmeli ve modal gizlenmelidir.
// 2. Kullanıcı, modal dışında bir yere tıkladığında modal kapatılmalıdır (örneğin, onClick ile bu durumu yönetin).
// 3. "Modal açık" başlığını dinamik hale getirin ve açılan modalın içeriğinin props ile özelleştirilmesine izin verin.
// 4. Modal kapatıldığında veya açıldığında konsola bir mesaj yazdırın (örn. "Modal açıldı" veya "Modal kapatıldı").

// Bonus:
// - Modal açıldığında, Escape tuşuna basılarak modalın kapatılabilmesini sağlayın.
// - Modal açıldığında arka planı karartarak kullanıcı dikkatini modala odaklayın (örneğin, yarı saydam bir siyah katman ekleyin).
// - Modal, ekran boyutlarına göre responsive olacak şekilde tasarlanmalıdır (mobil cihazlar için daha küçük bir boyut, geniş ekranlar için daha büyük bir boyut).
// - Kullanıcı modal açıkken sayfayı kaydırmayı engelleyin.

// Tailwind ile ilgili istekler:
// 1. Modal çerçevesine ve içeriğine gölge ekleyin (`shadow-lg`) ve daha belirgin tasarım sağlayın.
// 2. Modal açıkken, "Kapalı" butonuna hover veya focus durumlarında görsel geri bildirim sağlayın (örneğin, arka plan rengini veya gölgeyi değiştirin).
// 3. Arka plan karartma efekti için Tailwind kullanarak yarı saydam bir siyah katman (bg-black/50) ekleyin.
// 4. Mobil cihazlarda modalın kenarlıklarının ekrana taşmamasını sağlayacak iç kenar boşlukları (p-4) ekleyin.
// 5. Modal içeriğini ve kapat butonunu, özellikle ekran okuyucular (screen readers) için erişilebilir hale getirin (örneğin, aria-labelledby ve aria-hidden gibi erişilebilirlik özniteliklerini kullanın).

export default function App() {
  const [isOpen, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
    console.log("Modal açıldı");
    document.body.style.overflow = "hidden"; // Sayfa kaydırmasını engelle
  }

  function closeModal() {
    setOpen(false);
    console.log("Modal kapatıldı");
    document.body.style.overflow = "auto"; // Sayfa kaydırmasını eski haline getir
  }

  // Escape tuşuna basıldığında modalın kapanmasını sağla
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Modalı aç
      </button>

      {isOpen && <Modal closeModal={closeModal}>Modal içeriği burada</Modal>}
    </>
  );
}

function Modal({ children, closeModal }) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
      onClick={closeModal} // Dışarı tıklanınca kapat
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()} // İçeriğe tıklamayı engelle
        role="dialog"
        aria-labelledby="modal-title"
        aria-hidden="false"
      >
        <h1 id="modal-title" className="text-lg font-bold pb-2">
          Modal Açık
        </h1>
        <p>{children}</p>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Kapat
        </button>
      </div>
    </div>
  );
}

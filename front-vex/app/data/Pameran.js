export const ALL_EXHIBITIONS = [
    {
        id: "1",
        title: "ANIMOTION FEST 2026",
        subtitle: "ANIMASI",
        category: "Animasi",
        date: "5 Oktober 2026",
        image: "/image/Contoh-poster.svg", // Digunakan ProjectCard
        bannerImage: "/image/Contoh-poster.svg",
        posterImage: "/image/Contoh-poster.svg",
        likes: 196,
        karya: 72, // Dianggap sebagai total karya/views
        description: [
            { title: "✨ Selamat Datang di Animotion Fest!", content: "Ini adalah platform pameran digital yang menghadirkan dunia animasi penuh warna, kreativitas, dan imajinasi tanpa batas. Jelajahi karya-karya terbaik, temukan cerita inspiratif, dan rasakan pengalaman memasuki galeri animasi masa kini dalam satu ruang virtual." },
            { title: "⚠️ [Event Showcase]", content: "Pameran ini menampilkan hasil karya terbaik dari para kreator, mahasiswa, dan seniman muda berbakat. Setiap karya merupakan perpaduan antara seni visual, teknologi, storytelling, serta inovasi yang dihidupkan melalui gerakan dan ekspresi." },
            { title: "❗ [Apa yang Bisa Dilakukan?]", list: ["Menjelajahi pameran animasi 3D.", "Melihat karakter, film pendek, dan karya visual kreatif.", "Mengetahui proses di balik setiap animasi.", "Menemukan ide dan inspirasi dari para kreator muda.", "Merasakan pengalaman pameran modern berbasis online."] },
            { title: "🖥️ [Panduan Pengunjung]", list: ["Gunakan Mouse untuk memutar tampilan.", "Scroll untuk zoom masuk/keluar.", "Klik objek untuk melihat informasi karya.", "Geser tampilan untuk menjelajahi area pameran.", "Nikmati pengalaman seru di dunia animasi."] }
        ],
        stats: { likes: 196, karya: 72, startDate: "18/10/2026", endDate: "20/10/2026", studyLevel: "Animasi" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "2",
        title: "CYBER SECURITY SUMMIT",
        subtitle: "PBL - RKS",
        category: "Rekayasa Keamanan Siber",
        date: "12 Oktober 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 250,
        karya: 110,
        description: [
            { title: "🛡️ Keamanan Digital", content: "Menampilkan solusi keamanan jaringan terbaru hasil karya mahasiswa." },
            { title: "❗ [Fitur Utama]", list: ["Simulasi Pentesting.", "Analisis Malware."] }
        ],
        stats: { likes: 250, karya: 110, startDate: "15/10/2026", endDate: "17/10/2026", studyLevel: "Rekayasa Keamanan Siber" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "3",
        title: "MULTIMEDIA CREATIVE EXPO",
        subtitle: "PBL - TRM",
        category: "Teknik Rekayasa Multimedia",
        date: "20 Oktober 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 420,
        karya: 300,
        description: [
            { title: "🎨 Kreativitas Tanpa Batas", content: "Pameran desain grafis, video editing, dan fotografi interaktif." },
            { title: "💻 [Panduan]", list: ["Gunakan VR untuk pengalaman maksimal.", "Klik portofolio mahasiswa."] }
        ],
        stats: { likes: 420, karya: 300, startDate: "22/10/2026", endDate: "25/10/2026", studyLevel: "Rekayasa Multimedia" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "4",
        title: "GEOMATIKA DIGITAL MAP",
        subtitle: "PBL - GEO",
        category: "Teknik Geomatika",
        date: "25 Oktober 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 85,
        karya: 40,
        description: [
            { title: "📍 Pemetaan Masa Depan", content: "Visualisasi data geospasial dan pemetaan 3D wilayah Batam." },
            { title: "🔍 [Eksplorasi]", list: ["Peta Interaktif.", "Data Drone Survey."] }
        ],
        stats: { likes: 85, karya: 40, startDate: "26/10/2026", endDate: "28/10/2026", studyLevel: "Teknik Geomatika" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "5",
        title: "SOFTWARE INNOVATION DAY",
        subtitle: "PBL - TRPL",
        category: "Teknologi Rekayasa Perangkat Lunak",
        date: "30 Oktober 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 550,
        karya: 210,
        description: [
            { title: "🚀 Solusi Perangkat Lunak", content: "Aplikasi mobile dan web inovatif untuk memecahkan masalah harian." },
            { title: "🛠️ [Teknologi]", list: ["React & Next.js.", "Laravel Backend."] }
        ],
        stats: { likes: 550, karya: 210, startDate: "01/11/2026", endDate: "03/11/2026", studyLevel: "TRPL" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "6",
        title: "IOT SMART CITY EXPO",
        subtitle: "PBL - IF",
        category: "Teknik Informatika",
        date: "2 November 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 310,
        karya: 145,
        description: [
            { title: "🌐 Kota Pintar", content: "Integrasi sensor hardware dengan sistem cloud berbasis web." },
            { title: "💡 [Hardware]", list: ["ESP32 Projects.", "Smart Lighting System."] }
        ],
        stats: { likes: 310, karya: 145, startDate: "04/11/2026", endDate: "06/11/2026", studyLevel: "Teknik Informatika" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "7",
        title: "AI & DATA SCIENCE FAIR",
        subtitle: "PBL - IF",
        category: "Teknik Informatika",
        date: "10 November 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 600,
        karya: 400,
        description: [
            { title: "🤖 Kecerdasan Buatan", content: "Implementasi Machine Learning untuk prediksi dan otomasi." },
            { title: "📊 [Analisis]", list: ["Data Visualization.", "Neural Network Models."] }
        ],
        stats: { likes: 600, karya: 400, startDate: "12/11/2026", endDate: "14/11/2026", studyLevel: "Teknik Informatika" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "8",
        title: "GAME DEV SHOWCASE",
        subtitle: "PBL - TRM",
        category: "Teknik Rekayasa Multimedia",
        date: "15 November 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 780,
        karya: 560,
        description: [
            { title: "🎮 Mainkan Karyanya", content: "Demo game indie buatan mahasiswa menggunakan Unity dan Unreal Engine." },
            { title: "🕹️ [Genre]", list: ["RPG Adventure.", "Platformer 2D."] }
        ],
        stats: { likes: 780, karya: 560, startDate: "16/11/2026", endDate: "18/11/2026", studyLevel: "Rekayasa Multimedia" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "9",
        title: "DIGITAL MARKETING FEST",
        subtitle: "PBL - MJ",
        category: "Teknologi Rekayasa Perangkat Lunak", // Sesuaikan jika kategori manajemen belum ada
        date: "20 November 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 210,
        karya: 95,
        description: [
            { title: "📈 Strategi Bisnis", content: "Kampanye pemasaran digital dan branding produk UMKM lokal." },
            { title: "📱 [Sosmed]", list: ["Content Plan.", "Ads Optimization."] }
        ],
        stats: { likes: 210, karya: 95, startDate: "21/11/2026", endDate: "23/11/2026", studyLevel: "Akuntansi Manajerial" },
        institution: "Politeknik Negeri Batam"
    },
    {
        id: "10",
        title: "ELECTRONIC PROTOTYPE DAY",
        subtitle: "PBL - TE",
        category: "Teknik Informatika", // Sesuaikan jika kategori elektro belum ada
        date: "25 November 2026",
        image: "/image/BG1.jpg",
        bannerImage: "/image/BG1.jpg",
        posterImage: "/image/BG1.jpg",
        likes: 180,
        karya: 80,
        description: [
            { title: "⚡ Komponen Elektronik", content: "Rangkaian PCB dan robotika otomatis untuk industri 4.0." },
            { title: "⚙️ [Robot]", list: ["Line Follower.", "Arm Robot."] }
        ],
        stats: { likes: 180, karya: 80, startDate: "26/11/2026", endDate: "28/11/2026", studyLevel: "Teknik Elektro" },
        institution: "Politeknik Negeri Batam"
    }
];
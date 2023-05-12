/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["assets.nisomnia.com", "nisomnia.com"],
  },
  transpilePackages: ["editor", "ui"],
  async redirects() {
    return [
      {
        source: "/read",
        destination: "/article",
        permanent: true,
      },
      {
        source: "/content/Anime-Romance-Terbaik.png",
        destination: "https://nisomnia.com/article/anime-romance-terbaik_0nqcg",
        permanent: true,
      },
      {
        source: "/assets/media/2019/02/Rekomendasi-Anime-Harem-Terbaik.png",
        destination: "https://nisomnia.com/article/anime-harem-terbaik_5r2u3",
        permanent: true,
      },
      {
        source: "/assets/media/2019/12/Anime-Romance-Terbaik.png",
        destination: "https://nisomnia.com/article/anime-romance-terbaik_0nqcg",
        permanent: true,
      },
      {
        source: "/content/Kunci-Jawaban-TTS-Pintar-2021.png",
        destination:
          "https://nisomnia.com/article/kunci-jawaban-brain-out_aiobz",
        permanent: true,
      },
      {
        source: "/assets/media/2019/02/Anime-Action-Winter-2019.png",
        destination: "https://nisomnia.com/article/anime-romance-terbaik_0nqcg",
        permanent: true,
      },
      {
        source: "/assets/media/2019/09/cropped-laskar-pelangi.jpg",
        destination: "https://nisomnia.com/article/anime-harem-terbaik_5r2u3",
        permanent: true,
      },
      {
        source:
          "/assets/media/2019/02/Drama-Korea-Terbaik-Dengan-Rating-Tertinggi-Sepanjang-Masa.png",
        destination: "https://nisomnia.com/article/drama-korea-sekolah_p1l8k",
        permanent: true,
      },
      {
        source: "/assets/media/2019/02/Anime-Fantasy-Winter-2019.png",
        destination: "https://nisomnia.com/article/anime-harem-terbaik_5r2u3",
        permanent: true,
      },
      {
        source: "/article/kerugian-beli-hp-hdc",
        destination: "https://nisomnia.com/article/kerugian-beli-hp-hdc_eag7z",
        permanent: true,
      },
      {
        source: "/article/fakta-menarik-monkey-d-garp",
        destination:
          "https://nisomnia.com/article/fakta-menarik-monkey-d-garp_283ww",
        permanent: true,
      },
      {
        source: "/article/combo-trio-mid-lane-mobile-legends",
        destination:
          "https://nisomnia.com/article/combo-trio-mid-lane-mobile-legends_xqie3",
        permanent: true,
      },
      {
        source: "/article/luffy-menantang-kaido",
        destination:
          "https://nisomnia.com/article/perjalanan-luffy-menjadi-yonko_e1o77",
        permanent: true,
      },
      {
        source: "/article/tips-trik-push-rank-mobile-legends",
        destination:
          "https://nisomnia.com/article/tips-push-rank-mobile-legends_9kunx",
        permanent: true,
      },
      {
        source: "/article/kapten-divisi-terkuat-gotei-13-bleach",
        destination:
          "https://nisomnia.com/article/bleach-kapten-divisi-terkuat-di-gotei-13_sjvy6",
        permanent: true,
      },
      {
        source: "/article/mobile-legends-item-penghancur-armor",
        destination:
          "https://nisomnia.com/article/mobile-legends-item-penghancur-armor_cibzh",
        permanent: true,
      },
      {
        source: "/article/rekomendasi-build-miya",
        destination:
          "https://nisomnia.com/article/build-miya-mobile-legends_6tdoj",
        permanent: true,
      },
      {
        source: "/article/luffy-menantang-kaido",
        destination: "https://nisomnia.com/article/luffy-menantang-kaido_mh90q",
        permanent: true,
      },
      {
        source: "/article/build-karina-tank",
        destination:
          "https://nisomnia.com/article/build-karina-tank-mobile-legends_od853",
        permanent: true,
      },
      {
        source: "/article/daftar-juara-mpl",
        destination: "https://nisomnia.com/article/daftar-juara-mpl_ejfps",
        permanent: true,
      },
      {
        source: "/article/build-gusion-mobile-legends-tipe-hyper-carry",
        destination:
          "https://nisomnia.com/article/build-gusion-mobile-legends_dpkdp",
        permanent: true,
      },
      {
        source: "/article/cara-gampang-menang-bermain-magic-chess",
        destination:
          "https://nisomnia.com/article/cara-gampang-menang-bermain-magic-chess_hfkac",
        permanent: true,
      },
      {
        source: "/article/rekomendasi-build-alucard",
        destination:
          "https://nisomnia.com/article/build-alucard-mobile-legends_4j6n0",
        permanent: true,
      },
      {
        source: "/article/build-ling-terbaik",
        destination:
          "https://nisomnia.com/article/build-ling-mobile-legends_ifc4q",
        permanent: true,
      },
      {
        source: "/article/penyandang-nama-d-di-one-piece",
        destination:
          "https://nisomnia.com/article/penyandang-nama-d-one-piece_011iw",
        permanent: true,
      },
      {
        source:
          "/article/anggota-angkatan-laut-terkuat-yang-pernah-ada-di-one-piece",
        destination:
          "https://nisomnia.com/article/anggota-angkatan-laut-terkuat-one-piece_rh7kg",
        permanent: true,
      },
      {
        source: "/article/build-lancelot-ml-tersakit",
        destination: "https://nisomnia.com/article/build-lancelot-ml_e8amo",
        permanent: true,
      },
      {
        source: "/article/build-hayabusa-tersakit",
        destination:
          "https://nisomnia.com/article/build-hayabusa-mobile-legends_9pun3",
        permanent: true,
      },
      {
        source: "/article/build-clint-ml-tersakit",
        destination:
          "https://nisomnia.com/article/build-clint-ml-tersakit_0n5ik",
        permanent: true,
      },
      {
        source: "/article/anime-bertema-musik-terbaik",
        destination: "https://nisomnia.com/article/anime-musik-terbaik_8sw8l",
        permanent: true,
      },
      {
        source: "/article/daftar-hero-terkuat-multirole-mobile-legends",
        destination:
          "https://nisomnia.com/article/daftar-hero-terkuat-multirole-mobile-legends_b7l6u",
        permanent: true,
      },
      {
        source: "/article/apa-arti-dari-sebutan-waifu-dan-husbando",
        destination:
          "https://nisomnia.com/article/apa-arti-dari-sebutan-waifu-dan-husbando_gyzcf",
        permanent: true,
      },
      {
        source: "/article/daftar-role-mobile-legends",
        destination:
          "https://nisomnia.com/article/daftar-role-mobile-legends_l1y7s",
        permanent: true,
      },
      {
        source: "/article/urutan-rank-free-fire",
        destination: "https://nisomnia.com/article/urutan-rank-free-fire_zka3z",
        permanent: true,
      },
      {
        source: "/article/mengenal-kata-dere-dere",
        destination:
          "https://nisomnia.com/article/mengenal-kata-dere-dere_0eqqz",
        permanent: true,
      },
      {
        source: "/article/anime-mirip-one-piece",
        destination: "https://nisomnia.com/article/anime-mirip-one-piece_hulkm",
        permanent: true,
      },
      {
        source: "/article/anime-mirip-sword-art-online",
        destination:
          "https://nisomnia.com/article/anime-mirip-sword-art-online_k6pil",
        permanent: true,
      },
      {
        source: "/article/hero-offlaner-terbaik-mobile-legends",
        destination:
          "https://nisomnia.com/article/hero-offlaner-mobile-legends-terbaik_97clu",
        permanent: true,
      },
      {
        source: "/article/daftar-turnamen-mobile-legends-terbesar",
        destination:
          "https://nisomnia.com/article/daftar-turnamen-mobile-legends-terbesar_orqhd",
        permanent: true,
      },
      {
        source: "/article/anime-romance-terbaik",
        destination: "https://nisomnia.com/article/anime-romance-terbaik_0nqcg",
        permanent: true,
      },
      {
        source: "/article/anime-shounen-terbaik",
        destination: "https://nisomnia.com/article/anime-shounen-terbaik_j5hcu",
        permanent: true,
      },
      {
        source: "/article/fakta-unik-eren-yeager",
        destination:
          "https://nisomnia.com/article/fakta-unik-eren-yeager_rer8p",
        permanent: true,
      },
      {
        source: "/article/apa-itu-chuunibyou",
        destination: "https://nisomnia.com/article/apa-itu-chuunibyou_2xs7p",
        permanent: true,
      },
      {
        source: "/article/kunci-jawaban-tebak-gambar",
        destination:
          "https://nisomnia.com/article/kunci-jawaban-tebak-gambar_2fwln",
        permanent: true,
      },
      {
        source: "/article/kunci-jawaban-brain-out",
        destination:
          "https://nisomnia.com/article/kunci-jawaban-brain-out_aiobz",
        permanent: true,
      },
      {
        source: "/article/fakta-unik-blackpink",
        destination: "https://nisomnia.com/article/fakta-unik-blackpink_kyijz",
        permanent: true,
      },
      {
        source: "/article/cerita-harvest-moon-back-to-nature",
        destination:
          "https://nisomnia.com/article/cerita-harvest-moon-back-to-nature_7y838",
        permanent: true,
      },
      {
        source: "/article/boruto-lebih-buruk-dari-naruto",
        destination:
          "https://nisomnia.com/article/boruto-lebih-buruk-dari-naruto_ushug",
        permanent: true,
      },
      {
        source: "/article/build-hero-natan-mobile-legends",
        destination:
          "https://nisomnia.com/article/build-natan-mobile-legends_3q0oe",
        permanent: true,
      },
      {
        source: "/article/boss-game-terkuat-dan-sulit-untuk-dikalahkan",
        destination: "https://nisomnia.com/article/boss-game-terkuat_6klor",
        permanent: true,
      },
      {
        source: "/article/alasan-kenapa-karakter-anime-tidak-pernah-ganti-baju",
        destination:
          "https://nisomnia.com/article/alasan-kenapa-karakter-anime-tidak-pernah-ganti-baju_ryxif",
        permanent: true,
      },
      {
        source: "/article/momen-bangkitnya-kekuatan-baru-zoro",
        destination:
          "https://nisomnia.com/article/one-piece-moment-bangkitnya-kekuatan-baru-roronoa-zoro_g2ejc",
        permanent: true,
      },
      {
        source: "/article/game-asah-otak-android",
        destination:
          "https://nisomnia.com/article/game-asah-otak-android_1tkn2",
        permanent: true,
      },
      {
        source: "/article/emblem-mobile-legends",
        destination: "https://nisomnia.com/article/emblem-mobile-legends_0u6a4",
        permanent: true,
      },
      {
        source: "/article/baryon-mode-menumbalkan-kurama",
        destination:
          "https://nisomnia.com/article/boruto-baryon-mode-menumbalkan-kurama-bagaimana-nasib-naruto-dan-sasuke_3yp34",
        permanent: true,
      },
      {
        source: "/article/bajak-laut-binatang-buas",
        destination:
          "https://nisomnia.com/article/one-piece-bajak-laut-binatang-buas_airhh",
        permanent: true,
      },
      {
        source: "/article/daftar-hero-mobile-legends",
        destination:
          "https://nisomnia.com/article/daftar-hero-terkuat-multirole-mobile-legends_b7l6u",
        permanent: true,
      },
      {
        source: "/article/game-pc-ringan",
        destination: "https://nisomnia.com/article/game-pc-ringan_2e0u5",
        permanent: true,
      },
      {
        source: "/article/game-pc-offline-ringan",
        destination: "https://nisomnia.com/article/game-pc-ringan_2e0u5",
        permanent: true,
      },
      {
        source: "/article/siapa-itu-daimyo",
        destination: "https://nisomnia.com/article/siapa-itu-daimyo_ww4f",
        permanent: true,
      },
      {
        source: "/article/apa-itu-wibu",
        destination: "https://nisomnia.com/article/apa-itu-wibu_yktj5",
        permanent: true,
      },
      {
        source: "/article/game-gamehouse-terbaik",
        destination:
          "https://nisomnia.com/article/game-gamehouse-terbaik_c39ml",
        permanent: true,
      },
      {
        source: "/article/fakta-menarik-kurama",
        destination: "https://nisomnia.com/article/fakta-menarik-kurama_dx5y5",
        permanent: true,
      },
      {
        source: "/article/drama-korea-sekolah",
        destination: "https://nisomnia.com/article/drama-korea-sekolah_p1l8k",
        permanent: true,
      },
      {
        source: "/article/titan-shifter-attack-on-titan",
        destination:
          "https://nisomnia.com/article/titan-shifter-attack-on-titan_ygqtz",
        permanent: true,
      },
      {
        source: "/article/apa-itu-otaku",
        destination: "https://nisomnia.com/article/apa-itu-otaku_50l9t",
        permanent: true,
      },
      {
        source: "/article/bon-clay-dan-katakuri",
        destination: "https://nisomnia.com/article/bon-clay-dan-katakuri_0j5z7",
        permanent: true,
      },
      {
        source: "/article/anggota-terkuat-kru-bajak-laut-topi-jerami",
        destination:
          "https://nisomnia.com/article/anggota-terkuat-kru-bajak-laut-topi-jerami_92osy",
        permanent: true,
      },
      {
        source: "/article/apa-itu-seiyuu",
        destination: "https://nisomnia.com/article/apa-itu-seiyuu_pszmf",
        permanent: true,
      },
      {
        source: "/article/jenis-jutsu-di-dunia-naruto-dan-boruto",
        destination:
          "https://nisomnia.com/article/jenis-jutsu-di-dunia-naruto-dan-boruto_fqg9a",
        permanent: true,
      },
      {
        source: "/article/anime-slice-of-life-terbaik",
        destination:
          "https://nisomnia.com/article/anime-slice-of-life-terbaik_ghsn9",
        permanent: true,
      },
      {
        source: "/article/anime-horror-terbaik",
        destination: "https://nisomnia.com/article/anime-horror-terbaik_ouiv7",
        permanent: true,
      },
      {
        source: "/article/fakta-menarik-twice",
        destination: "https://nisomnia.com/article/fakta-menarik-twice_n0qaj",
        permanent: true,
      },
      {
        source: "/article/urutan-rank-mobile-legends",
        destination:
          "https://nisomnia.com/article/urutan-rank-mobile-legends_lz0u3",
        permanent: true,
      },
      {
        source: "/article/hero-terkuat-di-mobile-legends",
        destination:
          "https://nisomnia.com/article/hero-terkuat-mobile-legends_14aqn",
        permanent: true,
      },
      {
        source: "/article/fakta-menarik-bts",
        destination: "https://nisomnia.com/article/fakta-menarik-bts_p35ff",
        permanent: true,
      },
      {
        source: "/article/anime-china-terbaik",
        destination: "https://nisomnia.com/article/anime-china-terbaik_xmj7e",
        permanent: true,
      },
      {
        source: "/article/anime-harem-terbaik",
        destination: "https://nisomnia.com/article/anime-harem-terbaik_5r2u3",
        permanent: true,
      },
      {
        source: "/article/anime-seinen-terbaik",
        destination: "https://nisomnia.com/article/anime-seinen-terbaik_kitk2",
        permanent: true,
      },
      {
        source: "/article/fakta-unik-one-piece",
        destination: "https://nisomnia.com/article/fakta-unik-one-piece_kdzo8",
        permanent: true,
      },
      {
        source: "/read/kerugian-beli-hp-hdc",
        destination: "https://nisomnia.com/article/kerugian-beli-hp-hdc_eag7z",
        permanent: true,
      },
      {
        source: "/read/fakta-menarik-monkey-d-garp",
        destination:
          "https://nisomnia.com/article/fakta-menarik-monkey-d-garp_283ww",
        permanent: true,
      },
      {
        source: "/read/combo-trio-mid-lane-mobile-legends",
        destination:
          "https://nisomnia.com/article/combo-trio-mid-lane-mobile-legends_xqie3",
        permanent: true,
      },
      {
        source: "/read/luffy-menantang-kaido",
        destination:
          "https://nisomnia.com/article/perjalanan-luffy-menjadi-yonko_e1o77",
        permanent: true,
      },
      {
        source: "/read/tips-trik-push-rank-mobile-legends",
        destination:
          "https://nisomnia.com/article/tips-push-rank-mobile-legends_9kunx",
        permanent: true,
      },
      {
        source: "/read/kapten-divisi-terkuat-gotei-13-bleach",
        destination:
          "https://nisomnia.com/article/bleach-kapten-divisi-terkuat-di-gotei-13_sjvy6",
        permanent: true,
      },
      {
        source: "/read/mobile-legends-item-penghancur-armor",
        destination:
          "https://nisomnia.com/article/mobile-legends-item-penghancur-armor_cibzh",
        permanent: true,
      },
      {
        source: "/read/rekomendasi-build-miya",
        destination:
          "https://nisomnia.com/article/build-miya-mobile-legends_6tdoj",
        permanent: true,
      },
      {
        source: "/article/luffy-menantang-kaido",
        destination: "https://nisomnia.com/article/luffy-menantang-kaido_mh90q",
        permanent: true,
      },
      {
        source: "/read/build-karina-tank",
        destination:
          "https://nisomnia.com/article/build-karina-tank-mobile-legends_od853",
        permanent: true,
      },
      {
        source: "/read/daftar-juara-mpl",
        destination: "https://nisomnia.com/article/daftar-juara-mpl_ejfps",
        permanent: true,
      },
      {
        source: "/read/build-gusion-mobile-legends-tipe-hyper-carry",
        destination:
          "https://nisomnia.com/article/build-gusion-mobile-legends_dpkdp",
        permanent: true,
      },
      {
        source: "/read/cara-gampang-menang-bermain-magic-chess",
        destination:
          "https://nisomnia.com/article/cara-gampang-menang-bermain-magic-chess_hfkac",
        permanent: true,
      },
      {
        source: "/read/rekomendasi-build-alucard",
        destination:
          "https://nisomnia.com/article/build-alucard-mobile-legends_4j6n0",
        permanent: true,
      },
      {
        source: "/read/build-ling-terbaik",
        destination:
          "https://nisomnia.com/article/build-ling-mobile-legends_ifc4q",
        permanent: true,
      },
      {
        source: "/read/penyandang-nama-d-di-one-piece",
        destination:
          "https://nisomnia.com/article/penyandang-nama-d-one-piece_011iw",
        permanent: true,
      },
      {
        source:
          "/article/anggota-angkatan-laut-terkuat-yang-pernah-ada-di-one-piece",
        destination:
          "https://nisomnia.com/article/anggota-angkatan-laut-terkuat-one-piece_rh7kg",
        permanent: true,
      },
      {
        source: "/read/build-lancelot-ml-tersakit",
        destination: "https://nisomnia.com/article/build-lancelot-ml_e8amo",
        permanent: true,
      },
      {
        source: "/read/build-hayabusa-tersakit",
        destination:
          "https://nisomnia.com/article/build-hayabusa-mobile-legends_9pun3",
        permanent: true,
      },
      {
        source: "/read/build-clint-ml-tersakit",
        destination:
          "https://nisomnia.com/article/build-clint-ml-tersakit_0n5ik",
        permanent: true,
      },
      {
        source: "/read/anime-bertema-musik-terbaik",
        destination: "https://nisomnia.com/article/anime-musik-terbaik_8sw8l",
        permanent: true,
      },
      {
        source: "/read/daftar-hero-terkuat-multirole-mobile-legends",
        destination:
          "https://nisomnia.com/article/daftar-hero-terkuat-multirole-mobile-legends_b7l6u",
        permanent: true,
      },
      {
        source: "/read/apa-arti-dari-sebutan-waifu-dan-husbando",
        destination:
          "https://nisomnia.com/article/apa-arti-dari-sebutan-waifu-dan-husbando_gyzcf",
        permanent: true,
      },
      {
        source: "/read/daftar-role-mobile-legends",
        destination:
          "https://nisomnia.com/article/daftar-role-mobile-legends_l1y7s",
        permanent: true,
      },
      {
        source: "/read/urutan-rank-free-fire",
        destination: "https://nisomnia.com/article/urutan-rank-free-fire_zka3z",
        permanent: true,
      },
      {
        source: "/read/mengenal-kata-dere-dere",
        destination:
          "https://nisomnia.com/article/mengenal-kata-dere-dere_0eqqz",
        permanent: true,
      },
      {
        source: "/read/anime-mirip-one-piece",
        destination: "https://nisomnia.com/article/anime-mirip-one-piece_hulkm",
        permanent: true,
      },
      {
        source: "/read/anime-mirip-sword-art-online",
        destination:
          "https://nisomnia.com/article/anime-mirip-sword-art-online_k6pil",
        permanent: true,
      },
      {
        source: "/read/hero-offlaner-terbaik-mobile-legends",
        destination:
          "https://nisomnia.com/article/hero-offlaner-mobile-legends-terbaik_97clu",
        permanent: true,
      },
      {
        source: "/read/daftar-turnamen-mobile-legends-terbesar",
        destination:
          "https://nisomnia.com/article/daftar-turnamen-mobile-legends-terbesar_orqhd",
        permanent: true,
      },
      {
        source: "/read/anime-romance-terbaik",
        destination: "https://nisomnia.com/article/anime-romance-terbaik_0nqcg",
        permanent: true,
      },
      {
        source: "/read/anime-shounen-terbaik",
        destination: "https://nisomnia.com/article/anime-shounen-terbaik_j5hcu",
        permanent: true,
      },
      {
        source: "/read/fakta-unik-eren-yeager",
        destination:
          "https://nisomnia.com/article/fakta-unik-eren-yeager_rer8p",
        permanent: true,
      },
      {
        source: "/read/apa-itu-chuunibyou",
        destination: "https://nisomnia.com/article/apa-itu-chuunibyou_2xs7p",
        permanent: true,
      },
      {
        source: "/read/kunci-jawaban-tebak-gambar",
        destination:
          "https://nisomnia.com/article/kunci-jawaban-tebak-gambar_2fwln",
        permanent: true,
      },
      {
        source: "/read/kunci-jawaban-brain-out",
        destination:
          "https://nisomnia.com/article/kunci-jawaban-brain-out_aiobz",
        permanent: true,
      },
      {
        source: "/read/fakta-unik-blackpink",
        destination: "https://nisomnia.com/article/fakta-unik-blackpink_kyijz",
        permanent: true,
      },
      {
        source: "/read/cerita-harvest-moon-back-to-nature",
        destination:
          "https://nisomnia.com/article/cerita-harvest-moon-back-to-nature_7y838",
        permanent: true,
      },
      {
        source: "/read/boruto-lebih-buruk-dari-naruto",
        destination:
          "https://nisomnia.com/article/boruto-lebih-buruk-dari-naruto_ushug",
        permanent: true,
      },
      {
        source: "/read/build-hero-natan-mobile-legends",
        destination:
          "https://nisomnia.com/article/build-natan-mobile-legends_3q0oe",
        permanent: true,
      },
      {
        source: "/read/boss-game-terkuat-dan-sulit-untuk-dikalahkan",
        destination: "https://nisomnia.com/article/boss-game-terkuat_6klor",
        permanent: true,
      },
      {
        source: "/read/alasan-kenapa-karakter-anime-tidak-pernah-ganti-baju",
        destination:
          "https://nisomnia.com/article/alasan-kenapa-karakter-anime-tidak-pernah-ganti-baju_ryxif",
        permanent: true,
      },
      {
        source: "/read/momen-bangkitnya-kekuatan-baru-zoro",
        destination:
          "https://nisomnia.com/article/one-piece-moment-bangkitnya-kekuatan-baru-roronoa-zoro_g2ejc",
        permanent: true,
      },
      {
        source: "/read/game-asah-otak-android",
        destination:
          "https://nisomnia.com/article/game-asah-otak-android_1tkn2",
        permanent: true,
      },
      {
        source: "/read/emblem-mobile-legends",
        destination: "https://nisomnia.com/article/emblem-mobile-legends_0u6a4",
        permanent: true,
      },
      {
        source: "/read/baryon-mode-menumbalkan-kurama",
        destination:
          "https://nisomnia.com/article/boruto-baryon-mode-menumbalkan-kurama-bagaimana-nasib-naruto-dan-sasuke_3yp34",
        permanent: true,
      },
      {
        source: "/read/bajak-laut-binatang-buas",
        destination:
          "https://nisomnia.com/article/one-piece-bajak-laut-binatang-buas_airhh",
        permanent: true,
      },
      {
        source: "/read/daftar-hero-mobile-legends",
        destination:
          "https://nisomnia.com/article/daftar-hero-terkuat-multirole-mobile-legends_b7l6u",
        permanent: true,
      },
      {
        source: "/read/game-pc-ringan",
        destination: "https://nisomnia.com/article/game-pc-ringan_2e0u5",
        permanent: true,
      },
      {
        source: "/read/game-pc-offline-ringan",
        destination: "https://nisomnia.com/article/game-pc-ringan_2e0u5",
        permanent: true,
      },
      {
        source: "/read/siapa-itu-daimyo",
        destination: "https://nisomnia.com/article/siapa-itu-daimyo_ww4f",
        permanent: true,
      },
      {
        source: "/read/apa-itu-wibu",
        destination: "https://nisomnia.com/article/apa-itu-wibu_yktj5",
        permanent: true,
      },
      {
        source: "/read/game-gamehouse-terbaik",
        destination:
          "https://nisomnia.com/article/game-gamehouse-terbaik_c39ml",
        permanent: true,
      },
      {
        source: "/read/fakta-menarik-kurama",
        destination: "https://nisomnia.com/article/fakta-menarik-kurama_dx5y5",
        permanent: true,
      },
      {
        source: "/read/drama-korea-sekolah",
        destination: "https://nisomnia.com/article/drama-korea-sekolah_p1l8k",
        permanent: true,
      },
      {
        source: "/read/titan-shifter-attack-on-titan",
        destination:
          "https://nisomnia.com/article/titan-shifter-attack-on-titan_ygqtz",
        permanent: true,
      },
      {
        source: "/read/apa-itu-otaku",
        destination: "https://nisomnia.com/article/apa-itu-otaku_50l9t",
        permanent: true,
      },
      {
        source: "/read/bon-clay-dan-katakuri",
        destination: "https://nisomnia.com/article/bon-clay-dan-katakuri_0j5z7",
        permanent: true,
      },
      {
        source: "/read/anggota-terkuat-kru-bajak-laut-topi-jerami",
        destination:
          "https://nisomnia.com/article/anggota-terkuat-kru-bajak-laut-topi-jerami_92osy",
        permanent: true,
      },
      {
        source: "/read/apa-itu-seiyuu",
        destination: "https://nisomnia.com/article/apa-itu-seiyuu_pszmf",
        permanent: true,
      },
      {
        source: "/read/jenis-jutsu-di-dunia-naruto-dan-boruto",
        destination:
          "https://nisomnia.com/article/jenis-jutsu-di-dunia-naruto-dan-boruto_fqg9a",
        permanent: true,
      },
      {
        source: "/read/anime-slice-of-life-terbaik",
        destination:
          "https://nisomnia.com/article/anime-slice-of-life-terbaik_ghsn9",
        permanent: true,
      },
      {
        source: "/read/anime-horror-terbaik",
        destination: "https://nisomnia.com/article/anime-horror-terbaik_ouiv7",
        permanent: true,
      },
      {
        source: "/read/fakta-menarik-twice",
        destination: "https://nisomnia.com/article/fakta-menarik-twice_n0qaj",
        permanent: true,
      },
      {
        source: "/read/urutan-rank-mobile-legends",
        destination:
          "https://nisomnia.com/article/urutan-rank-mobile-legends_lz0u3",
        permanent: true,
      },
      {
        source: "/read/hero-terkuat-di-mobile-legends",
        destination:
          "https://nisomnia.com/article/hero-terkuat-mobile-legends_14aqn",
        permanent: true,
      },
      {
        source: "/read/fakta-menarik-bts",
        destination: "https://nisomnia.com/article/fakta-menarik-bts_p35ff",
        permanent: true,
      },
      {
        source: "/read/anime-china-terbaik",
        destination: "https://nisomnia.com/article/anime-china-terbaik_xmj7e",
        permanent: true,
      },
      {
        source: "/read/anime-harem-terbaik",
        destination: "https://nisomnia.com/article/anime-harem-terbaik_5r2u3",
        permanent: true,
      },
      {
        source: "/read/anime-seinen-terbaik",
        destination: "https://nisomnia.com/article/anime-seinen-terbaik_kitk2",
        permanent: true,
      },
      {
        source: "/read/fakta-unik-one-piece",
        destination: "https://nisomnia.com/article/fakta-unik-one-piece_kdzo8",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

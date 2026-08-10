# Mero Nepal — Deluxe Saloon 🇳🇵✂️

> **Iconic Nepali bangers playing live at the saloon.**  
> 🌐 **Live Website**: [https://timro.fun](https://timro.fun)

---

## 🎨 Live Website Preview

![Mero Nepal Deluxe Saloon Live Website Preview](preview.png)

---

## ✨ Key Features

- 🇳🇵 **Iconic Nepali Playlist**: Curated playlist featuring *Feri Jaalma*, *Rukum Maikot*, *Timro Pratiksa*, *Swami Ji Please*, *Jhim Jhim*, *Yo Mutu Mero*, *Kutu Ma Kutu*, *Kafle*, and *Naam K Ho*.
- 🎵 **Official Spotify Player Engine**: Streams directly from Spotify playlist `0XwQxGWur4iagqxaqDRx0G` via official Spotify EmbedController.
- 📀 **Spinning Vinyl Cover**: Animated 8s linear infinite rotation with exact saloon center circular hole overlay.
- ⚡ **100% Real-Time Presence Counter**: Tracks real active website visitors live via WebSockets and session heartbeat tracking.
- 💎 **Glassmorphic Deluxe Saloon Design**: High-saturate blur backdrop with responsive typography and transparent Devanagari text logo (*मेरो नेपाल*).

---

## 🚀 Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Styling**: Tailwind CSS v4 design tokens, custom CSS Glassmorphism
- **Audio Engine**: Spotify iFrame API (`IFrameAPI.createController`)
- **Presence Engine**: WebSocket + BroadcastChannel real-time session tracker
- **Deployment**: GitHub Pages / Hostinger (`timro.fun`)

---

## 🛠 Local Development

To run locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/prathamxeth/mero-nepal.git
   cd mero-nepal
   ```

2. Serve locally:
   ```bash
   python3 -m http.server 8085
   ```

3. Open `http://localhost:8085` in your web browser.

---

Made with ❤️

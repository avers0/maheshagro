import { useState } from "preact/hooks";

const WA_NUMBER = "919166029301";

export default function ContactFormIsland() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const text = `Hi, I am ${name} (${phone}). ${message}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div class="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-100 h-full">
      <h2 class="text-3xl font-black mb-10">Send a Message</h2>
      <form class="space-y-6" onSubmit={handleSubmit}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
            <input
              required
              type="text"
              class="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="Enter your name"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
            <input
              required
              type="tel"
              class="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              placeholder="Enter your phone"
              value={phone}
              onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
        <div>
          <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Message</label>
          <textarea
            required
            rows={6}
            class="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
            placeholder="How can we help you?"
            value={message}
            onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          />
        </div>
        <button
          type="submit"
          class="w-full flex items-center justify-center gap-3 bg-primary text-white py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-primary/20 active:scale-95 transition-all"
        >
          <span>Send via WhatsApp</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
        </button>
      </form>
    </div>
  );
}

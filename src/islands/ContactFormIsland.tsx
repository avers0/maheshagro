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
    <div class="card-paper p-8 md:p-12 h-full">
      <h2 class="text-3xl text-primary mb-8">Send a Message</h2>
      <form class="space-y-6" onSubmit={handleSubmit}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="field-label">Full Name</label>
            <input
              required
              type="text"
              class="field"
              placeholder="Enter your name"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
            />
          </div>
          <div>
            <label class="field-label">Phone Number</label>
            <input
              required
              type="tel"
              class="field"
              placeholder="Enter your phone"
              value={phone}
              onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
            />
          </div>
        </div>
        <div>
          <label class="field-label">Message</label>
          <textarea
            required
            rows={6}
            class="field"
            placeholder="How can we help you?"
            value={message}
            onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          />
        </div>
        <button
          type="submit"
          class="btn-primary w-full justify-center !py-4 !text-base"
        >
          <span>Send via WhatsApp</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
        </button>
      </form>
    </div>
  );
}

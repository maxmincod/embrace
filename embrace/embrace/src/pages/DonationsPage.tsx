
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const DonationsPage: React.FC = () => {
    const { musicians, addDonation } = useData();
    const { currentUser } = useAuth();
    const [recipient, setRecipient] = useState('label');
    const [amount, setAmount] = useState(10);
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount <= 0) {
            alert('Por favor, insira um valor válido.');
            return;
        }
        addDonation({
            donorId: currentUser?.id || null,
            donorName: currentUser?.username || 'Anônimo',
            recipientId: recipient,
            amount,
            message,
        });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h1 className="text-4xl font-bold mt-4 text-white">Obrigado!</h1>
                <p className="text-gray-300 mt-2">Seu apoio significa muito para nós e nossos artistas. Juntos, estamos construindo o futuro da música.</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-white">Apoie a Música</h1>
            <p className="text-gray-400 mt-2 text-center">Sua doação alimenta a criatividade. Escolha apoiar um artista individual ou toda a missão da Embrace.</p>

            <form onSubmit={handleSubmit} className="mt-8 bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-gray-300">Apoiar</label>
                    <select
                        id="recipient"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-white"
                    >
                        <option value="label">Embrace (A Gravadora)</option>
                        {musicians.map(m => (
                            <option key={m.id} value={m.id}>{m.artistName}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-300">Valor (BRL)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 sm:text-sm">R$</span>
                        </div>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="block w-full pl-10 pr-12 bg-gray-700 border-gray-600 rounded-md py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-white"
                            placeholder="0,00"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300">Mensagem (Opcional)</label>
                    <textarea
                        id="message"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-white"
                        placeholder="Suas palavras de incentivo..."
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-800 transition-colors"
                    >
                        Doar R${amount}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationsPage;

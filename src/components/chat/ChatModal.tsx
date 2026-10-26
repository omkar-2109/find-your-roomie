import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Building2, 
  Users, 
  MapPin, 
  Calendar, 
  Check, 
  CheckCheck,
  MessageSquare,
  Search,
  ArrowRight,
  Handshake,
  ExternalLink
} from 'lucide-react';

const ICEBREAKERS = [
  "What is your target move-in date?",
  "Are you looking for vegetarian flatmates?",
  "Let's schedule an in-person flat visit together!",
  "What is your typical WFH / office schedule?",
  "Are you open to splitting a 2BHK in Koramangala?"
];

export const ChatModal: React.FC = () => {
  const { 
    isChatOpen, 
    closeChat, 
    conversations, 
    activeConversationId, 
    setActiveConversationId,
    activeMessages,
    sendMessage,
    currentUser,
    navigateToListing
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedProposals, setAcceptedProposals] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  // Other participant ID
  const otherParticipantId = activeConv?.participantIds.find(id => id !== (currentUser?.id || 'current-user-id')) || activeConv?.participantIds[0];
  const otherName = activeConv?.participantNames[otherParticipantId || ''] || 'Roomzy User';
  const otherAvatar = activeConv?.participantAvatars[otherParticipantId || ''] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
  const otherRole = activeConv?.participantRoles[otherParticipantId || ''] || 'tenant';

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    const textToSend = inputText;
    setInputText('');
    await sendMessage(textToSend, 'text');
  };

  const handleSendIcebreaker = async (text: string) => {
    await sendMessage(text, 'text');
  };

  const handleProposeTeamUp = async () => {
    if (!activeConv?.listingId) {
      await sendMessage("Would you be interested in teaming up to rent an apartment together? Let's find a place that fits both our budgets!", 'text');
      return;
    }

    await sendMessage("Here is a Team Up proposal to share this apartment. Let's inspect it together!", 'teamup_proposal', {
      listingId: activeConv.listingId,
      listingTitle: activeConv.listingTitle || 'Luxury 2BHK Apartment',
      locality: 'Prime Tech Corridor',
      rentPerPerson: 16500,
      bhk: '2 BHK',
      photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      accepted: false
    });
  };

  const filteredConversations = conversations.filter(c => {
    const names = Object.values(c.participantNames).join(' ').toLowerCase();
    const listing = (c.listingTitle || '').toLowerCase();
    const query = searchQuery.toLowerCase();
    return names.includes(query) || listing.includes(query);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl h-[88vh] max-h-[750px] bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 1. Modal Master Header */}
        <div className="bg-stone-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-forest-emerald text-white flex items-center justify-center font-bold text-sm shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base tracking-tight leading-none text-white">
                  Messages & Team Up Chats
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Connect directly with verified flatmates and property hosts
              </p>
            </div>
          </div>

          <button
            onClick={closeChat}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
            title="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Main 2-Column Body */}
        <div className="flex-grow flex min-h-0 overflow-hidden">
          
          {/* Left Column: Conversations List */}
          <div className="w-full sm:w-80 md:w-84 border-r border-stone-200 bg-stone-50/70 flex flex-col shrink-0">
            {/* Search filter */}
            <div className="p-3 border-b border-stone-200/80 bg-white">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chats or listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-100 pl-8 pr-3 py-1.5 rounded-xl text-xs border border-stone-200/60 focus:outline-none focus:ring-1 focus:ring-forest text-stone-900"
                />
              </div>
            </div>

            {/* Conversation Items */}
            <div className="flex-grow overflow-y-auto divide-y divide-stone-100">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-stone-400 text-xs">
                  No conversations match your search.
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const isCurrent = conv.id === activeConversationId;
                  const otherId = conv.participantIds.find(id => id !== (currentUser?.id || 'current-user-id')) || conv.participantIds[0];
                  const name = conv.participantNames[otherId || ''] || 'Roomzy User';
                  const avatar = conv.participantAvatars[otherId || ''] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                  const role = conv.participantRoles[otherId || ''] || 'tenant';

                  return (
                    <button
                      key={conv.id}
                      onClick={() => setActiveConversationId(conv.id)}
                      className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors ${
                        isCurrent 
                          ? 'bg-white shadow-xs border-l-4 border-l-forest' 
                          : 'hover:bg-stone-100/70'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={avatar} 
                          alt={name} 
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-200" 
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                      </div>

                      <div className="flex-grow min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h4 className="font-bold text-xs text-stone-900 truncate">
                            {name}
                          </h4>
                          <span className="text-[10px] text-stone-400 shrink-0">
                            {conv.lastMessageAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full capitalize ${
                            role === 'host' 
                              ? 'bg-amber-100 text-amber-900' 
                              : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {role === 'host' ? 'Host' : 'Flatmate'}
                          </span>
                          {conv.listingTitle && (
                            <span className="text-[10px] text-stone-500 truncate">
                              • {conv.listingTitle}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-stone-600 truncate leading-snug">
                          {conv.lastMessage}
                        </p>
                      </div>

                      {conv.unreadCount > 0 && (
                        <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shrink-0 self-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Active Conversation Feed */}
          {activeConv ? (
            <div className="flex-grow flex flex-col bg-white overflow-hidden">
              
              {/* Thread Header */}
              <div className="p-3.5 px-4 sm:px-6 bg-white border-b border-stone-200 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img 
                      src={otherAvatar} 
                      alt={otherName} 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-forest/20" 
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-stone-900 truncate">
                        {otherName}
                      </h4>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" /> Aadhaar Verified
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="capitalize">{otherRole}</span>
                      {activeConv.listingTitle && (
                        <>
                          <span>•</span>
                          <span className="truncate text-forest font-semibold">
                            {activeConv.listingTitle}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Team Up Action in Header */}
                {otherRole === 'tenant' && (
                  <button
                    onClick={handleProposeTeamUp}
                    className="hidden sm:inline-flex items-center gap-1.5 bg-amber-soft hover:bg-amber-100 text-stone-900 px-3 py-1.5 rounded-full text-xs font-bold border border-amber/30 shadow-2xs transition-all shrink-0"
                  >
                    <Handshake className="w-3.5 h-3.5 text-amber-hover" />
                    <span>Propose Team Up</span>
                  </button>
                )}
              </div>

              {/* Messages Scroll Area */}
              <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/40">
                <div className="text-center my-2">
                  <span className="bg-stone-200/70 text-stone-600 text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-2xs">
                    Encrypted direct chat • Zero broker commission on Roomzy
                  </span>
                </div>

                {activeMessages.map((msg) => {
                  const isMine = msg.senderId === (currentUser?.id || 'current-user-id');

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} space-y-1`}
                    >
                      <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                        {!isMine && (
                          <img
                            src={msg.senderAvatar || otherAvatar}
                            alt={msg.senderName}
                            className="w-6 h-6 rounded-full object-cover shrink-0 mb-1 ring-1 ring-stone-200"
                          />
                        )}

                        <div className={`rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm leading-relaxed ${
                          isMine
                            ? 'bg-forest text-white rounded-br-xs shadow-xs'
                            : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200/80 shadow-2xs'
                        }`}>
                          
                          {/* Standard Text */}
                          {msg.text && (
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          )}

                          {/* Team Up Proposal Card */}
                          {msg.type === 'teamup_proposal' && msg.metadata && (
                            <div className="mt-2 p-3 bg-stone-900 text-white rounded-xl space-y-2 border border-stone-800 shadow-md">
                              <div className="flex items-center gap-1.5 text-amber text-[10px] font-bold uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Roomzy Team Up Proposal</span>
                              </div>

                              {msg.metadata.photo && (
                                <img
                                  src={msg.metadata.photo}
                                  alt={msg.metadata.listingTitle}
                                  className="w-full h-28 object-cover rounded-lg"
                                />
                              )}

                              <div>
                                <h5 className="font-bold text-xs text-white">
                                  {msg.metadata.listingTitle}
                                </h5>
                                <p className="text-[11px] text-stone-400">
                                  {msg.metadata.locality} • {msg.metadata.bhk}
                                </p>
                              </div>

                              <div className="p-2 rounded-lg bg-stone-800 border border-stone-700/80 flex items-center justify-between text-xs">
                                <span className="text-stone-300">Your Share:</span>
                                <span className="font-extrabold text-amber text-sm">
                                  ₹{msg.metadata.rentPerPerson?.toLocaleString('en-IN') || '16,500'} / mo
                                </span>
                              </div>

                              <div className="flex items-center gap-2 pt-1">
                                {acceptedProposals[msg.id] ? (
                                  <span className="w-full py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg text-center border border-emerald-500/40 flex items-center justify-center gap-1">
                                    <Check className="w-3.5 h-3.5" /> Team Up Accepted!
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => setAcceptedProposals(prev => ({ ...prev, [msg.id]: true }))}
                                    className="flex-grow py-1.5 bg-amber hover:bg-amber-light text-stone-950 text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1"
                                  >
                                    <Handshake className="w-3.5 h-3.5" />
                                    <span>Accept Team Up</span>
                                  </button>
                                )}

                                {msg.metadata.listingId && (
                                  <button
                                    onClick={() => {
                                      closeChat();
                                      navigateToListing(msg.metadata!.listingId!);
                                    }}
                                    className="px-2.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold rounded-lg border border-stone-700 flex items-center gap-1"
                                    title="View property details"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          )}

                          <div className={`text-[10px] mt-1 text-right flex items-center justify-end gap-1 ${
                            isMine ? 'text-white/70' : 'text-stone-400'
                          }`}>
                            <span>{msg.createdAt}</span>
                            {isMine && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Icebreakers Suggestions Bar */}
              <div className="px-3 py-2 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 pl-1">
                  Quick:
                </span>
                {ICEBREAKERS.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendIcebreaker(chip)}
                    className="text-[11px] font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0 border border-stone-200/60"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Message Input Form */}
              <form 
                onSubmit={handleSend}
                className="p-3 sm:p-4 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  placeholder="Type a message or discuss flatmate requirements..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-grow bg-stone-50 border border-stone-200/90 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest/20"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="bg-forest hover:bg-forest-light disabled:opacity-40 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-4 h-4 text-amber-light" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>

            </div>
          ) : (
            <div className="flex-grow flex items-center justify-center p-8 text-center text-stone-400">
              Select a conversation to start chatting
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

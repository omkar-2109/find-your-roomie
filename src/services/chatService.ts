import { supabase } from '../lib/supabase';
import { ChatMessage, Conversation, User } from '../types';

const LOCAL_CONVERSATIONS_KEY = 'roomzy_cached_conversations';
const LOCAL_MESSAGES_KEY = 'roomzy_cached_messages';

// Seed demo conversations for rich immediate experience
export const INITIAL_DEMO_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-ananya-flatmate',
    participantIds: ['current-user-id', 'user-ananya-sharma'],
    participantNames: {
      'current-user-id': 'You',
      'user-ananya-sharma': 'Ananya Sharma'
    },
    participantAvatars: {
      'current-user-id': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'user-ananya-sharma': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    participantRoles: {
      'current-user-id': 'tenant',
      'user-ananya-sharma': 'tenant'
    },
    lastMessage: 'Hey! I saw your post. Would you be open to checking out a 2BHK in Koramangala this weekend?',
    lastMessageAt: 'Just now',
    unreadCount: 1,
    listingId: 'listing-1',
    listingTitle: 'Luxury 2BHK with Balcony Garden'
  },
  {
    id: 'conv-rahul-host',
    participantIds: ['current-user-id', 'user-rahul-verma'],
    participantNames: {
      'current-user-id': 'You',
      'user-rahul-verma': 'Rahul Verma (Host)'
    },
    participantAvatars: {
      'current-user-id': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'user-rahul-verma': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    participantRoles: {
      'current-user-id': 'tenant',
      'user-rahul-verma': 'host'
    },
    lastMessage: 'Your scheduled visit for tomorrow 5:00 PM is confirmed! See you at the property.',
    lastMessageAt: '2h ago',
    unreadCount: 0,
    listingId: 'listing-2',
    listingTitle: 'Sunny Private Master Bedroom'
  }
];

export const INITIAL_DEMO_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-ananya-flatmate': [
    {
      id: 'msg-1',
      conversationId: 'conv-ananya-flatmate',
      senderId: 'user-ananya-sharma',
      senderName: 'Ananya Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'Hi there! I saw you are also looking for a flatmate in Koramangala / Indiranagar with budget around ₹18K.',
      createdAt: '10:30 AM',
      type: 'text'
    },
    {
      id: 'msg-2',
      conversationId: 'conv-ananya-flatmate',
      senderId: 'user-ananya-sharma',
      senderName: 'Ananya Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'I work in Product at a tech company, non-smoker, mostly hybrid WFH 3 days a week.',
      createdAt: '10:32 AM',
      type: 'text'
    },
    {
      id: 'msg-3',
      conversationId: 'conv-ananya-flatmate',
      senderId: 'user-ananya-sharma',
      senderName: 'Ananya Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'I found this incredible 2BHK on Roomzy with zero brokerage. Check out the team-up split proposal:',
      createdAt: '10:35 AM',
      type: 'teamup_proposal',
      metadata: {
        listingId: 'listing-1',
        listingTitle: 'Luxury 2BHK with Balcony Garden',
        locality: 'Koramangala 4th Block',
        rentPerPerson: 18000,
        bhk: '2 BHK',
        photo: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
        accepted: false
      }
    },
    {
      id: 'msg-4',
      conversationId: 'conv-ananya-flatmate',
      senderId: 'user-ananya-sharma',
      senderName: 'Ananya Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      text: 'Hey! I saw your post. Would you be open to checking out a 2BHK in Koramangala this weekend?',
      createdAt: '10:36 AM',
      type: 'text'
    }
  ],
  'conv-rahul-host': [
    {
      id: 'msg-h1',
      conversationId: 'conv-rahul-host',
      senderId: 'current-user-id',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: 'Hi Rahul, I submitted a visit request for the Sunny Private Master Bedroom. Is parking included?',
      createdAt: 'Yesterday',
      type: 'text'
    },
    {
      id: 'msg-h2',
      conversationId: 'conv-rahul-host',
      senderId: 'user-rahul-verma',
      senderName: 'Rahul Verma (Host)',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Yes! Covered 2-wheeler and 4-wheeler parking is completely free. Your scheduled visit for tomorrow 5:00 PM is confirmed! See you at the property.',
      createdAt: '2h ago',
      type: 'text'
    }
  ]
};

function getLocalConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem(LOCAL_CONVERSATIONS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse local conversations:', e);
  }
  return INITIAL_DEMO_CONVERSATIONS;
}

function saveLocalConversations(convs: Conversation[]) {
  try {
    localStorage.setItem(LOCAL_CONVERSATIONS_KEY, JSON.stringify(convs));
  } catch (e) {
    console.error('Failed to save local conversations:', e);
  }
}

function getLocalMessages(): Record<string, ChatMessage[]> {
  try {
    const raw = localStorage.getItem(LOCAL_MESSAGES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse local messages:', e);
  }
  return INITIAL_DEMO_MESSAGES;
}

function saveLocalMessages(msgs: Record<string, ChatMessage[]>) {
  try {
    localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(msgs));
  } catch (e) {
    console.error('Failed to save local messages:', e);
  }
}

/**
 * Fetch all conversations for the active user
 */
export async function fetchUserConversations(currentUser: User | null): Promise<Conversation[]> {
  const localList = getLocalConversations();
  
  if (!supabase || !currentUser) {
    return localList;
  }

  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participant_ids', [currentUser.id])
      .order('last_message_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return localList;
    }

    const mapped: Conversation[] = data.map((row: any) => ({
      id: row.id,
      participantIds: row.participant_ids || [],
      participantNames: row.participant_names || {},
      participantAvatars: row.participant_avatars || {},
      participantRoles: row.participant_roles || {},
      lastMessage: row.last_message || 'No messages yet',
      lastMessageAt: row.last_message_at ? new Date(row.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
      unreadCount: 0,
      listingId: row.listing_id,
      listingTitle: row.listing_title
    }));

    return mapped;
  } catch (err) {
    console.warn('Falling back to cached conversations:', err);
    return localList;
  }
}

/**
 * Fetch messages for a specific conversation
 */
export async function fetchConversationMessages(conversationId: string): Promise<ChatMessage[]> {
  const allLocal = getLocalMessages();
  const localMsgs = allLocal[conversationId] || [];

  if (!supabase) {
    return localMsgs;
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error || !data || data.length === 0) {
      return localMsgs;
    }

    const mapped: ChatMessage[] = data.map((row: any) => ({
      id: row.id,
      conversationId: row.conversation_id,
      senderId: row.sender_id,
      senderName: row.sender_name,
      senderAvatar: row.sender_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: row.text,
      createdAt: row.created_at ? new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now',
      type: row.message_type || 'text',
      metadata: row.metadata || {}
    }));

    return mapped;
  } catch (err) {
    return localMsgs;
  }
}

/**
 * Send a message and update conversation
 */
export async function sendChatMessage(
  conversationId: string,
  message: {
    senderId: string;
    senderName: string;
    senderAvatar: string;
    text: string;
    type?: 'text' | 'teamup_proposal';
    metadata?: any;
  }
): Promise<ChatMessage> {
  const newMsg: ChatMessage = {
    id: 'msg-' + Date.now(),
    conversationId,
    senderId: message.senderId,
    senderName: message.senderName,
    senderAvatar: message.senderAvatar,
    text: message.text,
    createdAt: 'Just now',
    type: message.type || 'text',
    metadata: message.metadata
  };

  // 1. Update Local Storage instantly
  const allLocalMsgs = getLocalMessages();
  const thread = allLocalMsgs[conversationId] || [];
  thread.push(newMsg);
  allLocalMsgs[conversationId] = thread;
  saveLocalMessages(allLocalMsgs);

  // Update conversation last message
  const allConvs = getLocalConversations();
  const convIdx = allConvs.findIndex(c => c.id === conversationId);
  if (convIdx >= 0) {
    allConvs[convIdx].lastMessage = message.type === 'teamup_proposal' ? '📋 Sent a Team Up proposal' : message.text;
    allConvs[convIdx].lastMessageAt = 'Just now';
    saveLocalConversations(allConvs);
  }

  // 2. Persist to Supabase if available
  if (supabase) {
    try {
      await supabase.from('messages').insert({
        id: newMsg.id,
        conversation_id: conversationId,
        sender_id: message.senderId,
        sender_name: message.senderName,
        sender_avatar: message.senderAvatar,
        text: message.text,
        message_type: message.type || 'text',
        metadata: message.metadata || {}
      });

      await supabase.from('conversations').update({
        last_message: message.type === 'teamup_proposal' ? '📋 Sent a Team Up proposal' : message.text,
        last_message_at: new Date().toISOString()
      }).eq('id', conversationId);
    } catch (err) {
      console.warn('Supabase message persist deferred:', err);
    }
  }

  return newMsg;
}

/**
 * Find or create a conversation with a flatmate or host
 */
export async function getOrCreateConversation(
  currentUser: User,
  targetUser: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  },
  listingContext?: {
    id: string;
    title: string;
  }
): Promise<Conversation> {
  const allConvs = getLocalConversations();
  const existing = allConvs.find(c => 
    c.participantIds.includes(targetUser.id) && 
    c.participantIds.includes(currentUser.id) &&
    (!listingContext || c.listingId === listingContext.id)
  );

  if (existing) {
    return existing;
  }

  const newConv: Conversation = {
    id: 'conv-' + Date.now(),
    participantIds: [currentUser.id, targetUser.id],
    participantNames: {
      [currentUser.id]: currentUser.name,
      [targetUser.id]: targetUser.name
    },
    participantAvatars: {
      [currentUser.id]: currentUser.avatar,
      [targetUser.id]: targetUser.avatar
    },
    participantRoles: {
      [currentUser.id]: currentUser.role,
      [targetUser.id]: targetUser.role
    },
    lastMessage: 'Started conversation',
    lastMessageAt: 'Just now',
    unreadCount: 0,
    listingId: listingContext?.id,
    listingTitle: listingContext?.title
  };

  allConvs.unshift(newConv);
  saveLocalConversations(allConvs);

  if (supabase) {
    try {
      await supabase.from('conversations').insert({
        id: newConv.id,
        participant_ids: newConv.participantIds,
        listing_id: newConv.listingId,
        listing_title: newConv.listingTitle,
        last_message: newConv.lastMessage,
        last_message_at: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Supabase conversation creation deferred:', e);
    }
  }

  return newConv;
}

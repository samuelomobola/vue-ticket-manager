const TICKETS_KEY = 'ticketapp_tickets';

// Initialize tickets with sample data if empty
const initializeTickets = () => {
  const existing = localStorage.getItem(TICKETS_KEY);
  if (!existing) {
    const sampleTickets = [
      {
        id: '1',
        title: 'Welcome to Ticket Manager',
        description: 'This is your first ticket. You can edit or delete it.',
        status: 'open',
        priority: 'medium',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Setup deployment pipeline',
        description: 'Configure CI/CD for automatic deployments',
        status: 'in_progress',
        priority: 'high',
        createdAt: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '3',
        title: 'Update documentation',
        description: 'Review and update user documentation',
        status: 'closed',
        priority: 'low',
        createdAt: new Date(Date.now() - 172800000).toISOString()
      }
    ];
    localStorage.setItem(TICKETS_KEY, JSON.stringify(sampleTickets));
    return sampleTickets;
  }
  return JSON.parse(existing);
};

// Get all tickets
export function getTickets() {
  return initializeTickets();
}

// Get ticket by ID
export function getTicketById(id) {
  const tickets = getTickets();
  return tickets.find(t => t.id === id);
}

// Create new ticket
export function createTicket(ticketData) {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now().toString(),
    ...ticketData,
    createdAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return newTicket;
}

// Update existing ticket
export function updateTicket(id, ticketData) {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);

  if (index === -1) {
    throw new Error('Ticket not found');
  }

  tickets[index] = {
    ...tickets[index],
    ...ticketData,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  return tickets[index];
}

// Delete ticket
export function deleteTicket(id) {
  const tickets = getTickets();
  const filtered = tickets.filter(t => t.id !== id);
  localStorage.setItem(TICKETS_KEY, JSON.stringify(filtered));
  return true;
}

// Get ticket statistics
export function getTicketStats() {
  const tickets = getTickets();
  return {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  };
}

import './Navbar.css'

const Navbar = () => {
  return (
    <nav
      className="Navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="Nav-container">
        <a href="/" aria-label="Home">
          <img
            src="/icons/logo.svg"
            alt="ticz logo with a ticket icon and the word ticz beside it"
            className="w-16"
          />
        </a>

        <ul
          className="nav-links"
          role="menubar"
          aria-label="Main menu"
        >
          <li role="none">
            <a
              href="/events"
              role="menuitem"
              aria-current={window.location.pathname === '/events' ? 'page' : undefined}
            >
              Events
            </a>
          </li>
          <li role="none">
            <a
              href="/my-tickets"
              role="menuitem"
              aria-current={window.location.pathname === '/my-tickets' ? 'page' : undefined}
            >
              My Tickets
            </a>
          </li>
          <li role="none">
            <a
              href="/about"
              role="menuitem"
              aria-current={window.location.pathname === '/about' ? 'page' : undefined}
            >
              About Project
            </a>
          </li>
        </ul>

        <a
          href="/my-tickets"
          className="nav-btn"
          role="button"
          aria-label="View my tickets"
        >
          MY TICKETS →
        </a>
      </div>
    </nav>
  );
};

export default Navbar;

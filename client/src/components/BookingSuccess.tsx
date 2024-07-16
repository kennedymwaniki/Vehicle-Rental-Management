const BookingSuccess = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <div className="bg-green-500 rounded-full p-6 mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-white size-12"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your purchase. You can now access your new vehicle.
        </p>
        <div className="flex gap-4">
          <a
            className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            href="#"
            rel="ugc"
          >
            Go back to dashboard
          </a>
          <a
            className="inline-flex items-center justify-center h-10 px-6 rounded-md border border-input bg-background text-muted-foreground font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            href=""
            rel="ugc"
          >
            Browse more vehicles
          </a>
        </div>
      </div>
    </>
  );
};

export default BookingSuccess;

import './globals.css';

export const metadata = {
  title: 'FJ RentCar - Premium Car Rental',
    description: 'Layanan rental mobil premium terpercaya',
    };

    export default function RootLayout({
      children,
      }: {
        children: React.ReactNode;
        }) {
          return (
              <html lang="id">
                    <body>{children}</body>
                        </html>
                          );
                          }
                          

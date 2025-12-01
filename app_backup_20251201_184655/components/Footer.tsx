export function Footer() {
    return (
        <footer className="py-12 border-t bg-secondary/10">
            <div className="container px-4 md:px-6 mx-auto text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} ML & Quant Trading Portfolio. All rights reserved.</p>
            </div>
        </footer>
    );
}

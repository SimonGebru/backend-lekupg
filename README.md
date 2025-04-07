# backend-lekupg

# Jag har byggt ett boklånssystem i Node.js och Express, som hanterar tre typer av data: böcker, användare och lån.

# Systemet använder JSON-filer som databas och är uppdelat i olika routers för varje resurstyp – så att det är modulärt och lätt att underhålla.

# Funktionaliteten inkluderar att man kan:
# 	•	📚 Hämta och lägga till böcker
#	•	👤 Skapa nya användare
#	•	🔄 Låna och återlämna böcker
#	•	🔍 Få fram vilka böcker en viss användare har lånat
#	•	📖 Se alla utlånade böcker

# När en bok lånas ut sätts egenskapen available till false, och när den återlämnas ändras den till true.
# Alla endpoints testas med Postman och svarar med tydliga JSON-data.

# Jag har också tänkt på datatyper:
# 	•	Titlar och namn är strings
#	•	ID:n är nummer
#	•	Utlåningsdatum är i ISO-format
#	•	Och tillgänglighet är en boolean

# Sist har jag kommenterat all kod rad för rad för att visa att jag verkligen förstått vad varje del gör.
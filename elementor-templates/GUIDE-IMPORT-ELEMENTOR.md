# Guide Import PRIMEO — Elementor

## 1. CSS
Collez le contenu de `primeo-elementor-custom.css` dans **Apparence → Personnaliser → CSS Additionnel**

## 2. Images
Uploadez vos images dans **Médias → Ajouter** et notez les URLs

## 3. Importer les templates
**Elementor → Mes Templates → Importer** → sélectionnez chaque `.json`

## 4. Créer les pages
**Pages → Ajouter** → nommer → **Modifier avec Elementor** → icône dossier → **Mes Templates** → Insérer

## 5. Remplacer les images
Dans le code HTML des widgets, remplacez `https://votre-site.com/wp-content/uploads/...` par vos vraies URLs

## WooCommerce
- Panier : `[woocommerce_cart]`
- Checkout : `[woocommerce_checkout]`
- Compte : `[woocommerce_my_account]`

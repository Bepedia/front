
export const state = () => ({
  currentRoute: null,
  menuItems: [
    {
      link: '/',
      icon: '/nav-icons/home.svg'
    },
    {
      title: 'Recettes',
      subtitle: 'Les meilleurs plats par les meilleurs chef(fe)s',
      link: '/recette',
      img: '/homepage-items/recipes.jpeg',
      icon: '/nav-icons/recipe-book.svg'
    },
    {
      title: 'Coutures',
      subtitle: 'Les créations de type couturières',
      link: '/couture',
      img: '/homepage-items/couture.jpeg',
      icon: '/nav-icons/embroidery.svg'
    },
    {
      title: 'Bêtises',
      subtitle: 'Les pires dingueries (de Jenny, principalement)',
      link: '/betise',
      img: '/homepage-items/betises.jpeg',
      icon: '/nav-icons/silly.svg'
    },
    {
      title: 'Nendoroids',
      subtitle: 'Notre collection de Nendoroids',
      link: '/nendoroids',
      img: '/homepage-items/nendoroids.jpeg',
      icon: '/nav-icons/wooden.svg'
    },
    {
      title: 'Cartons',
      subtitle: 'Gérer les cartons et ce qu\'il y a dedans',
      link: '/cartons',
      img: '/homepage-items/cartons.jpeg',
      icon: '/nav-icons/open-box.svg'
    }
  ]
});

export const mutations = {
  setCurrentRoute(state, value) {
    state.currentRoute = value;
  }
}

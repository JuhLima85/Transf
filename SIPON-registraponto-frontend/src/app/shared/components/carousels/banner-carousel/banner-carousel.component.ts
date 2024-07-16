  import {
    AfterViewInit,
    Component,      
    ElementRef,
    HostListener,
    Input,
    QueryList,
    ViewChild,
    ViewChildren,
  } from '@angular/core';
  
  
  @Component({
    selector: 'app-banner-carousel',
    templateUrl: './banner-carousel.component.html',
    styleUrls: ['./banner-carousel.component.scss'],
  })
  export class BannerCarouselComponent  implements AfterViewInit {


    items = [
      { 
        img:'./assets/images/bannerCarousel1.png',
        link:'https://www.google.com.br',
        arquivo:'',
        alt:'Jovem mulher, em um túnel, sorrindo e olhando a tela de seu telefone. Veículos passando ao fundo.',
        index:0
      },
      { img:'./assets/images/bannerCarousel2.png',link:'',arquivo:'arquivoDummy',alt:'Jovem mulher, em um túnel, sorrindo e olhando a tela de seu telefone. Veículos passando ao fundo. ',index:0 },
      { img:'./assets/images/bannerCarousel3.png',link:'https://www.facebook.com.br',arquivo:'',alt:'Jovem mulher, em um túnel, sorrindo e olhando a tela de seu telefone. Veículos passando ao fundo. ',index:0 },]
    @ViewChild('carousel') public carousel: ElementRef;    
    @ViewChildren('carouselInner') carouselInner: QueryList<ElementRef>;
  
    @Input() showControls = true;
    public itemWidth: number;
    public slideAtual = 0;
    carouselWrapperStyle = {};
  
    constructor() {
        // esperando funcionalidade
    }
  

    /**
     * Progride o carousel em 1 slide.
     */
    next() {      
      this.slideAtual = (this.slideAtual + 1)
    }
  
    /**
     * Regressa o carousel em 1 slide.
     */
    prev() {
      // if (this.slideAtual === 0) return;
  
      this.slideAtual =
        (this.slideAtual - 1) 
    }

    /**
     * Move o slider para o slide desejado.
     */
    goTo(index:number) {
      if (this.slideAtual === index) return;
      this.slideAtual = index;

      let posicaoSlideDesejado = this.itemWidth * this.slideAtual
      this.carousel.nativeElement.scrollLeft = posicaoSlideDesejado
    }
  
    ngAfterViewInit() {
      setTimeout(()=> {
      this.reSizeCarousel();

      },150)
    }
  
    /**
     * Escuta por mudanças no viewport do monitor e da trigger no re-size
     */
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      this.reSizeCarousel();
    }
  
    /**
     * Re-size no carousel e da trigger em `this.transitionCarousel()` para resetar a posição dos filhos.
     * 
     * Usado no initial load e na troca de viewport do monitor.
     */
    reSizeCarousel(): void {
      // re-size 
      this.itemWidth = this.carouselInner.first.nativeElement.getBoundingClientRect().width;
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`,
      };
    }
  


    estadoAtualScroll:any
    dragging(evento: any) {
      if(!this.isDragging) return

      this.carousel.nativeElement.scrollLeft = this.scrollLeftInicial - ( evento.pageX - this.xInicial)

      this.carousel.nativeElement.className = 'carousel-inner dragging'
   
    }
    
    isDragging:boolean = false
    xInicial:any
    scrollLeftInicial:any
    dragIniciado(evento:any){
    this.isDragging = true
    this.carousel.nativeElement.className = 'carousel-inner dragging'
    this.xInicial = evento.pageX;
    this.scrollLeftInicial = this.carousel.nativeElement.scrollLeft
    

    }

    finalizarDrag(evento:any){
      this.isDragging = false;
      this.carousel.nativeElement.className = 'carousel-inner'

      if(this.carousel.nativeElement.scrollLeft < this.itemWidth ){
        this.slideAtual = 0
      }else if(  this.carousel.nativeElement.scrollLeft >= this.itemWidth && this.carousel.nativeElement.scrollLeft < this.itemWidth * 2 ){
        this.slideAtual = 1
      }else if(this.carousel.nativeElement.scrollLeft >= this.itemWidth * 2){
        this.slideAtual = 2

      } 

    }

    ctaBanner(item:any){
      console.log("🚀 ~ BannerCarouselComponent ~ ctaBanner ~ item:", item)
      if(!!item.link){
        console.log('Teste');
      }else if (!item.arquivo){
        console.log('Teste');    
      }
    }
  }
  
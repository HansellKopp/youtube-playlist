import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { Snippet } from 'src/app/models/youtube.model'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  data: Snippet[] = []
  videoId: string = ''
  videoTitle: string = ''
  showModal: boolean = false
  constructor(
    private service: YoutubeService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.load()
  }
  @HostListener('window:scroll',['$event'] )
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300
    const max = (document.documentElement.scrollHeight || document.body.scrollTop)
    if(pos > max) {
      this.load()
    }
  }
  
  load() {
    this.service.getSnippets().subscribe(data => this.data.push(...data))
  }

  onClick(snippet: Snippet) {    
    this.videoTitle= snippet.title
    this.videoId = snippet.resourceId.videoId
    this.toogleModal()
  }

  toogleModal() {
    this.showModal = !this.showModal
  }

  get video(): SafeHtml {
    let html = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${this.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }
}
